import { Request, Response } from "express";
import { PurchaseController } from "../controllers/purchase.controller";
import { BaseRouter } from "./base.router";
import { PurchaseMiddleware } from "../middlewares/purchase.middleware";

export class PurchaseRouter extends BaseRouter<PurchaseController, PurchaseMiddleware> {

    constructor() {
        super(PurchaseController, PurchaseMiddleware);
    }

    routes(): void {
        this.router.post('/new-purchase',
            (req, res, next) => [this.middleware.purchaseValidator(req, res, next)],
            (req: Request, res: Response) => this.controller.createPurchase(req, res)
        );
        this.router.post('/purchases', (req: Request, res: Response) => this.controller.getPurchases(req, res));
        this.router.post('/purchase/:id', (req: Request, res: Response) => this.controller.findPurchaseById(req, res));
        this.router.put('/update-purchase/:id', (req: Request, res: Response) => this.controller.updatePurchase(req, res));
        this.router.delete('/delete-purchase/:id', (req: Request, res: Response) => this.controller.deletePurchase(req, res));
    }
}