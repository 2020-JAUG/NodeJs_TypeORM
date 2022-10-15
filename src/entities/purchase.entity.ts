import {Column, Entity, JoinColumn, ManyToMany, ManyToOne} from "typeorm";
import {BaseEntity} from "../config/base.entity";
import {CustomerEntity} from "./customer.entity";
import {JoinTable} from "typeorm/browser";
import {ProductEntity} from "./product.entity";

@Entity({ name: "purchases" })
export class PurchaseEntity extends BaseEntity {

    @ManyToOne(() => CustomerEntity, customer => customer.purchases)
    @JoinColumn({ name: 'customer_id' })
    customer: CustomerEntity;

   // @ManyToMany(() => ProductEntity, product => product.purchases)
   //  @JoinTable({
   //      name: 'purchase_products',
   //      joinColumn: { name: 'purchase_id'},
   //      inverseJoinColumn: { name: 'product_id'}
   //  })
   //  products: ProductEntity[];

    @Column()
    status: string;

    @Column()
    quantity_product: number;

    @Column()
    total_price: number;

    @Column()
    payment_method: string;
}
