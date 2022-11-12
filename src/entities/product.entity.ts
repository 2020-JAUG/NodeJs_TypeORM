import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { CategoryEntity } from "./category.entity";
import { PurchaseEntity } from "./purchase.entity";
import { PurchaseProductEntity } from "./purchaseProduct.entity";

@Entity({ name: "products" })
export class ProductEntity extends BaseEntity {

    @ManyToOne(() => CategoryEntity, category => category.products)
    @JoinColumn({ name: 'category_id' })
    category: CategoryEntity;

    //@ManyToMany(() => PurchaseEntity, purchase => purchase.products)
    //purchases: PurchaseEntity[];

    @OneToMany(() => PurchaseProductEntity, productPurchase => productPurchase.product)
    purchaseProducts: PurchaseProductEntity[];

    @Column()
    product_name: string;

    @Column()
    description: string;

    @Column()
    price: number
}
