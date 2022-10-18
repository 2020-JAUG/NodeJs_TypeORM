import {DeleteResult, UpdateResult} from "typeorm";
import {PurchaseProductEntity} from "../entities/purchaseProduct.entity";
import {BaseService} from "../config/base.service";
import {ProductService} from "./product.service";
import {PurchaseProductDTO} from "../entities/dto/purchaseProduct.dto";

export class PurchaseProductService extends BaseService<PurchaseProductEntity> {

    constructor(private readonly productService: ProductService = new ProductService()) {
        super(PurchaseProductEntity);
    }

    async createPurchaseProduct(body: PurchaseProductDTO): Promise<PurchaseProductEntity> {
        console.log(body)

        // This line only stores quantity_product that is sent from postman, but does not collect foreign keys.
        //const new_purchase_product = (await this.execRepository).create(body);
        const new_purchase_product = Object.assign({}, new PurchaseProductEntity(), body);

        // if I search for the product by body I find it, but if I try to search through the variable, I do not find it.
        const find_product = await this.productService.findProductById(JSON.stringify(body.product?.id));

        new_purchase_product.totalPrice = find_product!.price * new_purchase_product.quantityProduct;
        return (await this.execRepository).save(new_purchase_product);

        //const newPurchaseProduct = Object.assign({}, new PurchaseProductEntity(), body);

        //const entity = (await this.execRepository).create(attributes);

        //const find_product = await this.repository.findOneBy(entity.product?.id);

        //return this.repository.save(entity);
        //}

        //const newPurchaseProduct = (await this.execRepository).create(body);

        //const product = await this.productService.findProductById(newPurchaseProduct.product.id);

        //newPurchaseProduct.totalPrice = product!.price * newPurchaseProduct.quantityProduct;
        //return (await this.execRepository).save(newPurchaseProduct);

    }

    async findAllPurchaseProducts(): Promise<PurchaseProductEntity[]> {
        return (await this.execRepository).find();
    }

    async findPurchaseProductById(id: string): Promise<PurchaseProductEntity | null> {
        return (await this.execRepository).findOneBy({id});
    }

    async deletePurchaseProduct(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({id});
    }

    async updatePurchaseProduct(
        id: string,
        infoUpdate: PurchaseProductDTO
    ): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }
}