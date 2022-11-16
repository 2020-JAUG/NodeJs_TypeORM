import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../helpers/http.response";
import { PurchaseProductPurchaseDTO } from "../entities/dto/purchaseProductPurchase.dto";
import { validate } from "class-validator";

export class PurchaseProductPurchaseMiddleware {

    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    purchaseProductPurValidator(req: Request, res: Response, next: NextFunction) {

        const { purchase, product, quantityProduct, total_price } = req.body;

        const validation = new PurchaseProductPurchaseDTO();

        validation.product = product;
        validation.purchase = purchase;
        validation.quantityProduct = quantityProduct;
        validation.totalPrice = total_price;

        validate(validation).then((err) => {

            if (err.length > 0) {
                return this.httpResponse.InternalServerError(res, err);
            } else {
                next();
            }
        });
    }
}