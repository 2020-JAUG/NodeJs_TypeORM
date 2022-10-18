import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { PurchaseEntity } from "./purchase.entity";
import {BaseEntity} from "../config/base.entity";
import {ProductEntity} from "./product.entity";

@Entity({ name: "purchases_products" })
export class PurchaseProductEntity extends BaseEntity {
    @Column()
    quantityProduct: number;

    @Column()
    totalPrice: number;

    @ManyToOne(() => PurchaseEntity, (purchase) => purchase.purchaseProducts)
    @JoinColumn({ name: "purchase_id" })
    purchase: PurchaseEntity;

    @ManyToOne(() => ProductEntity, (product) => product.purchaseProducts)
    @JoinColumn({ name: "product_id" })
    product!: ProductEntity;
}