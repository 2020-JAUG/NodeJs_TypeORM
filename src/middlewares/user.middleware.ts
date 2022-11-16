import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { UserDTO } from "../entities/dto/user.dto";
import { HttpResponse } from "../helpers/http.response";

export class UserMiddleware {

    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    userValidator(req: Request, res: Response, next: NextFunction) {

        const { name, last_name, user_name, email, password, role } = req.body;

        const validation = new UserDTO();

        validation.name = name;
        validation.last_name = last_name;
        validation.user_name = user_name;
        validation.email = email;
        validation.password = password;
        validation.role = role;

        validate(validate).then((err) => {
            if (err.length > 0) {
                return this.httpResponse.InternalServerError(res, err);
            } else {
                next();
            }
        });
    }
}