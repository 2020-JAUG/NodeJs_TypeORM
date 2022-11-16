import { Request, Response } from "express";
import { BaseRouter } from "./base.router";
import { CategoryController } from "../controllers/category.controller";
import { CategoryMiddleware } from "../middlewares/category.middleware";

export class CategoryRouter extends BaseRouter<CategoryController, CategoryMiddleware> {

    constructor() {
        super(CategoryController, CategoryMiddleware)
    }

    routes(): void {
        this.router.post('/new-category',
            (req, res, next) => [this.middleware.categoryValidator(req, res, next)],
            (req: Request, res: Response) => this.controller.createCategory(req, res)
        );
        this.router.post('/categories', (req: Request, res: Response) => this.controller.getCategories(req, res));
        this.router.post('/category/:id', (req: Request, res: Response) => this.controller.findCategoryById(req, res));
        this.router.put('/update-category/:id', (req: Request, res: Response) => this.controller.updateCategory(req, res));
        this.router.delete('/delete-category/:id', (req: Request, res: Response) => this.controller.deleteCategory(req, res));
    }
}