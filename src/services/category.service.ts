import {CategoryEntity} from "../entities/category.entity";
import {DeleteResult, UpdateResult} from "typeorm";
import {BaseService} from "../config/base.service";
import {AppDataSource} from "../config/data.source";
import {CategoryDto} from "../entities/dto/category.dto";

export class CategoryService extends BaseService<CategoryEntity> {

    protected repository = AppDataSource.getRepository(CategoryEntity);

    constructor() {
        super(CategoryEntity)
    }

    async createCategory(body: CategoryDto): Promise<CategoryEntity> {
        return (await this.execRepository).save(body);
    }

    async findAllCategories(): Promise<CategoryEntity[]> {
        return (await this.execRepository).find();
    }

    async findCategoryById(id: string): Promise<CategoryEntity | null> {
        return (await this.execRepository).findOneBy({id});
    }

    async updateCategory(id: string, infoUpdate: CategoryDto): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    async deleteCategory(id: string): Promise<DeleteResult> {
        return (await this.repository).softDelete(id);
    }
}