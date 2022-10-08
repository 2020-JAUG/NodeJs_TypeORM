import {Request, Response} from "express";
import {PurchaseController} from "../controllers/purchase.controller";
import {BaseRouter} from "./base.router";

export class PurchaseRouter extends BaseRouter<PurchaseController, void> {

    constructor() {
        super(PurchaseController);
    }

    routes(): void {
        this.router.post('/new-purchase', (req: Request, res: Response) => this.controller.createPurchase(req, res));
        this.router.post('/purchases', (req: Request, res: Response) => this.controller.getPurchases(req, res));
        this.router.post('/purchase/:id', (req: Request, res: Response) => this.controller.findPurchaseById(req, res));
        this.router.put('/update-purchase/:id', (req: Request, res: Response) => this.controller.updatePurchase(req, res));
        this.router.delete('/delete-purchase/:id', (req: Request, res: Response) => this.controller.deletePurchase(req, res));
    }
}