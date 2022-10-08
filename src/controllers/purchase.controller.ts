import {PurchaseService} from "../services/purchase.service";
import {Request, Response} from "express";
import {DeleteResult, UpdateResult} from "typeorm";
import {HttpResponse} from "../helpers/http.response";

export class PurchaseController {

    constructor(
        private readonly purchaseService: PurchaseService = new PurchaseService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {}

    async createPurchase(req: Request, res: Response) {
        try {
            const data = await this.purchaseService.createPurchase(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async getPurchases(req: Request, res: Response) {
        try {
            const data = await this.purchaseService.findAllPurchase();
            data.length === 0 ? this.httpResponse.NotFound(res, 'Data not found!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async findPurchaseById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.purchaseService.findPurchaseById(id);
            data === null ? this.httpResponse.NotFound(res, 'Purchase not found!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async updatePurchase(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: UpdateResult = await this.purchaseService.updatePurchase(id, req.body);
            data.affected === 0 ? this.httpResponse.NotFound(res, 'The purchase cannot be updated!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async deletePurchase(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: DeleteResult = await this.purchaseService.deletePurchase(id);
            data.affected === 0 ? this.httpResponse.NotFound(res, 'The purchase cannot be deleted!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }
}