import { BaseRouter } from "./base.router";
import { Request, Response } from "express";
import { PurchaseProductController } from "../controllers/purchaseProduct.controller";
import { PurchaseProductPurchaseMiddleware } from "../middlewares/purchase.product.purchase.middleware";

export class PurchaseProductRouter extends BaseRouter<PurchaseProductController, PurchaseProductPurchaseMiddleware> {
    constructor() {
        super(PurchaseProductController, PurchaseProductPurchaseMiddleware);
    }

    routes(): void {
        this.router.post('/new-purchase-product',
            (req, res, next) => [this.middleware.purchaseProductPurValidator(req, res, next)],
            (req: Request, res: Response) => this.controller.createPurchaseProduct(req, res)
        );
        this.router.post('/purchase-product', (req: Request, res: Response) => this.controller.getPurchaseProducts(req, res));
        this.router.post('/purchase-product/:id', (req: Request, res: Response) => this.controller.findPurchaseProductById(req, res));
        this.router.put('/update-purchase-product/:id', (req: Request, res: Response) => this.controller.updatePurchaseProduct(req, res));
        this.router.delete('/delete-purchase-product/:id', (req: Request, res: Response) => this.controller.deletePurchaseProduct(req, res));
    }
}