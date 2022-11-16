import { Request, Response } from "express";
import { BaseRouter } from "./base.router";
import { ProductController } from "../controllers/product.controller";
import { ProductMiddleware } from "../middlewares/product.middleware";

export class ProductRouter extends BaseRouter<ProductController, ProductMiddleware> {

    constructor() {
        super(ProductController, ProductMiddleware);
    }

    routes(): void {
        this.router.post('/new-product',
            (req, res, next) => [this.middleware.productValidator(req, res, next)],
            (req: Request, res: Response) => this.controller.createProduct(req, res)
        );
        this.router.post('/products', (req: Request, res: Response) => this.controller.getProducts(req, res));
        this.router.post('/product/:id', (req: Request, res: Response) => this.controller.findProductById(req, res));
        this.router.put('/update-product/:id', (req: Request, res: Response) => this.controller.updateProduct(req, res));
        this.router.delete('/delete-product/:id', (req: Request, res: Response) => this.controller.deleteProduct(req, res));
    }
}