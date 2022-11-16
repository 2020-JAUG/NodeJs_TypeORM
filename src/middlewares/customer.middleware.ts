import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../helpers/http.response";
import { CustomerDto } from "../entities/dto/customer.dto";
import { validate } from "class-validator";

export class CustomerMiddleware {

    constructor(

        private readonly httpResponse: HttpResponse = new HttpResponse()

    ) { }

    customerValidator(req: Request, res: Response, next: NextFunction) {

        const { identity_card, user } = req.body;

        const validation = new CustomerDto();

        //validation.address = address;
        validation.identity_card = identity_card;
        validation.user = user;

        validate(validation).then((err) => {

            if (err.length > 0) {
                return this.httpResponse.InternalServerError(res, err);
            } else {
                next();
            }
        });
    }
}