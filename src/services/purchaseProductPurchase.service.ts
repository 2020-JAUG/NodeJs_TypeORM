import { DeleteResult, UpdateResult } from "typeorm";
import { PurchaseProductPurchase } from "../entities/purchaseProductPurchase.entity";
import { BaseService } from "../config/base.service";
import { ProductService } from "./product.service";
import { PurchaseProductPurchaseDTO } from "../entities/dto/purchaseProductPurchase.dto";
import { ProductEntity } from "../entities/product.entity";

export class PurchaseProductPurchaseService extends BaseService<PurchaseProductPurchase> {

    constructor(private readonly productService: ProductService = new ProductService()) {
        super(PurchaseProductPurchase);
    }

    async createPurchaseProduct(body: PurchaseProductPurchaseDTO): Promise<PurchaseProductPurchase | null> {

        //const entity = Object.assign({}, new PurchaseProductPurchase(), body);
        //const entity = Object.assign({}, new ProductEntity(), body);

        //const entity = new ProductEntity();
        //const entity = (await this.execRepository).create(Object.assign(new PurchaseProductPurchase(), body));

        //const find_product = await this.productService.findProductById(entity.product?.id);

        const createCustomer = new PurchaseProductPurchase()
        createCustomer.purchase = body.purchase;
        createCustomer.product = body.product;
        createCustomer.quantity_product = body.quantityProduct;
        //entity.total_price = find_product.price * entity.quantity_product;

        //const newProduct = await (await this.execRepository).save(entity)

        //return this.repository.save(entity);
        //return (await this.execRepository).save(entity);

        //const entity = (await this.execRepository).create(body);
        const find_product = await this.productService.findProductById(createCustomer.product.id);
        createCustomer.total_price = find_product!.price * createCustomer.quantity_product;


        return (await this.execRepository).save(createCustomer);

        // This line only stores quantity_product that is sent from postman, but does not collect foreign keys.
        //const new_purchase_product = (await this.execRepository).create(body);
        //const new_purchase_product = Object.assign({}, new PurchaseProductPurchase(), body);

        // if I search for the product by body I find it, but if I try to search through the variable, I do not find it.
        //const find_product = await this.productService.findProductById(JSON.stringify(body.product?.id));

        //new_purchase_product.totalPrice = find_product!.price * new_purchase_product.quantityProduct;
        //return (await this.execRepository).save(new_purchase_product);

        //const newPurchaseProduct = Object.assign({}, new PurchaseProductPurchase(), body);

        //const entity = (await this.execRepository).create(attributes);

        //const find_product = await this.repository.findOneBy(entity.product?.id);

        //return this.repository.save(entity);
        //}

        //const newPurchaseProduct = (await this.execRepository).create(body);

        //const product = await this.productService.findProductById(newPurchaseProduct.product.id);

        //newPurchaseProduct.totalPrice = product!.price * newPurchaseProduct.quantityProduct;
        //return (await this.execRepository).save(newPurchaseProduct);

    }

    async findAllPurchaseProducts(): Promise<PurchaseProductPurchase[]> {
        return (await this.execRepository).find();
    }

    async findPurchaseProductById(id: string): Promise<PurchaseProductPurchase | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    async deletePurchaseProduct(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    }

    async updatePurchaseProduct(
        id: string,
        infoUpdate: PurchaseProductPurchaseDTO
    ): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    }
}