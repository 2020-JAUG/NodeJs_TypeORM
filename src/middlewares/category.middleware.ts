import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../helpers/http.response";
import { CategoryDto } from "../entities/dto/category.dto";
import { validate } from "class-validator";

export class CategoryMiddleware {

    constructor(
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    categoryValidator(req: Request, res: Response, next: NextFunction) {

        const { category_name } = req.body;

        const validation = new CategoryDto();

        validation.category_name = category_name;

        validate(validation).then((err) => {

            if (err.length > 0) {
                return this.httpResponse.InternalServerError(res, err);
            } else {
                next();
            }
        });
    }
}