import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { CustomerEntity } from "./customer.entity";
import { JoinTable } from "typeorm/browser";
import { ProductEntity } from "./product.entity";
import { PurchaseProductEntity } from "./purchaseProduct.entity";
import { IsNotEmpty } from "class-validator";

@Entity({ name: "purchases" })
export class PurchaseEntity extends BaseEntity {

    @IsNotEmpty()
    @ManyToOne(() => CustomerEntity, customer => customer.purchases)
    @JoinColumn({ name: 'customer_id' })
    customer: CustomerEntity;

    @ManyToMany(() => ProductEntity)
    @JoinTable()
    //{
    //name: 'purchase_products',
    //joinColumn: { name: 'purchase_id' },
    //inverseJoinColumn: { name: 'product_id' }
    //})
    products: ProductEntity[];

    @OneToMany(() => PurchaseProductEntity, productPurchase => productPurchase.purchase)
    purchaseProducts: PurchaseProductEntity[];

    @Column()
    status: string;

    // @Column()
    // quantity_product: number;
    //
    // @Column()
    // total_price: number;

    @Column()
    payment_method: string;
}
