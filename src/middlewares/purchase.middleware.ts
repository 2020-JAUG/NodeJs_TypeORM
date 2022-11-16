import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../helpers/http.response";
import { PurchaseDTO } from "../entities/dto/purchase.dto";
import { validate } from "class-validator";

export class PurchaseMiddleware {

    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    purchaseValidator(req: Request, res: Response, next: NextFunction) {

        const { payment_method, status, customer } = req.body;

        const validation = new PurchaseDTO();

        validation.customer = customer;
        validation.payment_method = payment_method;
        validation.status = status;

        validate(validation).then((err) => {

            if (err.length > 0) {
                return this.httpResponse.InternalServerError(res, err);
            } else {
                next();
            }
        });
    }
}