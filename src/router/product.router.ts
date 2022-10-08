import {Request, Response} from "express";
import {BaseRouter} from "./base.router";
import {ProductController} from "../controllers/product.controller";

export class ProductRouter extends BaseRouter<ProductController, void> {

    constructor() {
        super(ProductController);
    }

    routes(): void {
        this.router.post('/new-product', (req: Request, res: Response) => this.controller.createPurchaseProduct(req, res));
        this.router.post('/products', (req: Request, res: Response) => this.controller.getProducts(req, res));
        this.router.post('/product/:id', (req: Request, res: Response) => this.controller.findProductById(req, res));
        this.router.put('/update-product/:id', (req: Request, res: Response) => this.controller.updateProduct(req, res));
        this.router.delete('/delete-product/:id', (req: Request, res: Response) => this.controller.deleteProduct(req, res));
    }
}