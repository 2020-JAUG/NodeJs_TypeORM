import {CategoryService} from "../services/category.service";
import {Request, Response} from "express";
import {DeleteResult, UpdateResult} from "typeorm";
import {HttpResponse} from "../helpers/http.response";

export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService = new CategoryService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {}

    async createCategory(req: Request, res: Response) {
        try {
            const data = await this.categoryService.createCategory(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async getCategories(req: Request, res: Response) {
        try {
            const data = await this.categoryService.findAllCategories();
            data.length === 0 ? this.httpResponse.NotFound(res, 'Data not found!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async findCategoryById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = await this.categoryService.findCategoryById(id);
            data === null ? this.httpResponse.NotFound(res, 'Category not found!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }

    async updateCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: UpdateResult = await this.categoryService.updateCategory(id, req.body);
            data.affected === 0 ? this.httpResponse.NotFound(res, 'Category cannot be updated!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }

    }

    async deleteCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: DeleteResult = await this.categoryService.deleteCategory(id);
            data.affected === 0 ? this.httpResponse.NotFound(res, 'Category cannot be deleted!') : this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.InternalServerError(res, e);
        }
    }
}