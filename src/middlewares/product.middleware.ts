import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../helpers/http.response";
import { ProductDto } from "../entities/dto/product.dto";
import { validate } from "class-validator";

export class ProductMiddleware {

    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    productValidator(req: Request, res: Response, next: NextFunction) {

        const { product_name, description, price, category_id } = req.body;

        const validation = new ProductDto();

        validation.category = category_id;
        validation.description = description;
        validation.price = price;
        validation.product_name = product_name;

        validate(validation).then((err) => {

            if (err.length > 0) {
                return this.httpResponse.InternalServerError(res, err);
            } else {
                next();
            }
        })
    }
}