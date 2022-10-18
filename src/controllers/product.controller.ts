import {ProductService} from "../services/product.service";
import {Request, Response} from "express";
import {DeleteResult, UpdateResult} from "typeorm";
import {HttpResponse} from "../helpers/http.response";

export class ProductController {

    constructor(
       private readonly productService: ProductService = new ProductService(),
       private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {}

    async createProduct(req: Request, res: Response) {
        try {
            const data = await this.productService.createProduct(req.body);
            data === null ? this.httpResponse.NotFound(res, 'Data not found!')  : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

/*    async createPurchaseProduct(req: Request, res: Response) {
        try {
            const data = await this.productService.createProduct(req.body);
            return this.httpResponse.Ok(res, data);
        } catch ({message}) {
            return this.httpResponse.InternalServerError(res, message)
        }
    }*/

    async getProducts(req: Request, res: Response) {
        try {
            const data = await this.productService.findAllProducts();
            data.length === 0 ? this.httpResponse.NotFound(res, 'Data not found!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async findProductById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.productService.findProductById(id);
            data === null ? this.httpResponse.NotFound(res, 'Product not found!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async updateProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: UpdateResult = await this.productService.updateProduct(id, req.body);
            data.affected === 0 ? this.httpResponse.NotFound(res, 'Product cannot be updated!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async deleteProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: DeleteResult = await this.productService.deleteProduct(id);
            data.affected === 0 ? this.httpResponse.NotFound(res, 'Product cannot be deleted!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }
}