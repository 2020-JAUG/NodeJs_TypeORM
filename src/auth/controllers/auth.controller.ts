import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { HttpResponse } from "../../helpers/http.response";
import { UserEntity } from "../../entities/user.entity";
import { IGetUserAuthInfoRequest } from "./auth.IUserRequest";

export class AuthController extends AuthService {

    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {
        super();
    }

    async login(req: IGetUserAuthInfoRequest, res: Response) {

        try {
            const user = req.user;

            const encode = await this.generateJwt(user);

            if (!encode) {
                return this.httpResponse.Unauthorized(res, 'Unauthorized!')
            }

            res.header("Content-Type", "application/json");
            res.cookie("accessToken", encode.accessToken, { maxAge: 60000 * 60 });
            res.write(JSON.stringify(encode));
            res.end();

        } catch (error) {
            console.error(error);
            return this.httpResponse.InternalServerError(res, error.data.parameters);
        }
    }

}