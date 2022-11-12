import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { CustomerEntity } from "./customer.entity";
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

    @Column()
    status: string;

    @Column()
    payment_method: string;
}
