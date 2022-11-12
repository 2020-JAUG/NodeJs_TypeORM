import { ProductEntity } from "../entities/product.entity";
import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { ProductDto } from "../entities/dto/product.dto";
import { AppDataSource } from "../config/data.source";

export class ProductService extends BaseService<ProductEntity> {

    protected repository = AppDataSource.getRepository(ProductEntity);

    constructor(
        //private readonly product: ProductService = new ProductService()
    ) {
        super(ProductEntity);
    }

    async createProduct(body: ProductDto): Promise<ProductEntity> {
        return (await this.execRepository).save(body);
    }

    //async createPurchaseProduct(attributes: ProductDto): Promise<ProductEntity> {

    //const entity = Object.assign({}, new ProductEntity(), attributes);

    //const entity = (await this.execRepository).create(attributes);

    //const find_product = await this.repository.findOneBy(entity.product?.id);

    //return this.repository.save(entity);
    //}

    async findAllProducts(): Promise<ProductEntity[]> {
        return (await this.execRepository).find();
    }

    async findProductById(id: string): Promise<ProductEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    async updateProduct(id: string, infoUpdate: ProductDto): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }

    async deleteProduct(id: string): Promise<DeleteResult> {
        return (await this.repository).softDelete(id);
    }
}