import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../helpers/http.response";
import { PurchaseProductPurchaseService } from "../services/purchaseProductPurchase.service";

export class PurchaseProductController {

    constructor(
        private readonly purchaseProductService: PurchaseProductPurchaseService = new PurchaseProductPurchaseService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async createPurchaseProduct(req: Request, res: Response) {
        try {
            const data = await this.purchaseProductService.createPurchaseProduct(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async getPurchaseProducts(req: Request, res: Response) {
        try {
            const data = await this.purchaseProductService.findAllPurchaseProducts();
            data.length === 0 ? this.httpResponse.NotFound(res, 'Data not found!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async findPurchaseProductById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.purchaseProductService.findPurchaseProductById(id);
            data === null ? this.httpResponse.NotFound(res, 'Purchase not found!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async updatePurchaseProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: UpdateResult = await this.purchaseProductService.updatePurchaseProduct(id, req.body);
            data.affected === 0 ? this.httpResponse.NotFound(res, 'The purchase cannot be updated!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async deletePurchaseProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: DeleteResult = await this.purchaseProductService.deletePurchaseProduct(id);
            data.affected === 0 ? this.httpResponse.NotFound(res, 'The purchase cannot be deleted!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }
}