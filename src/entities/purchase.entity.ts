import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { CustomerEntity } from "./customer.entity";
import { JoinTable } from "typeorm/browser";
import { ProductEntity } from "./product.entity";
import { PurchaseProductEntity } from "./purchaseProduct.entity";
import { IsNotEmpty } from "class-validator";
import { PurchaseProductPurchase } from "./purchase_product_purchase.entity";

@Entity({ name: "purchases" })
export class PurchaseEntity extends BaseEntity {

    @IsNotEmpty()
    @ManyToOne(() => CustomerEntity, customer => customer.purchases)
    @JoinColumn({ name: 'customer_id' })
    customer: CustomerEntity;

    @OneToMany(() => PurchaseProductPurchase, productPurchase => productPurchase.purchase)
    purchases: PurchaseProductPurchase[];

    @OneToMany(() => PurchaseProductEntity, productPurchase => productPurchase.purchase)
    purchaseProducts: PurchaseProductEntity[];

    @Column()
    status: string;

    @Column()
    payment_method: string;
}
