import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { RoleType } from "../../entities/dto/user.dto";
import { UserEntity } from "../../entities/user.entity";
import { HttpResponse } from "../http.response";

export class SharedMiddleware {

    constructor(
        protected readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    passAuth(type: string) { //Aqui recibo el nombre de cada strategy
        return passport.authenticate(type, { session: false });
    }

    checkAdminRole(req: Request, res: Response, next: NextFunction) {

        const user = req["user"] as UserEntity;

        if (user.role !== RoleType.ADMIN) {
            return this.httpResponse.Unauthorized(res);
        }
        return next();
    }
}