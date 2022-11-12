import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { ProductEntity } from "../entities/product.entity";
import { PurchaseEntity } from "../entities/purchase.entity";

@Entity({ name: 'purchase_product_purchases' })
export class PurchaseProductPurchase {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    quantity_product: number;

    @Column()
    total_price: number;

    @ManyToOne(() => ProductEntity, (product) => product.products)
    @JoinColumn({
        name: "product_id",
        referencedColumnName: "id"
    })
    product: ProductEntity;

    @ManyToOne(() => PurchaseEntity, (purchase) => purchase.purchases)
    @JoinColumn({
        name: "purchase_id",
        referencedColumnName: "id"
    })
    purchase: PurchaseEntity;
}