import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany} from "typeorm";
import {BaseEntity} from "../config/base.entity";
import {CustomerEntity} from "./customer.entity";


@Entity({ name: "purchases" })
export class PurchaseEntity extends BaseEntity {

    @Column()
    status: string;

    @Column()
    payment_method: string;

    @Column()
    quantity_product: number

    @Column()
    total_price: number

    @ManyToOne(() => CustomerEntity, customer => customer.purchases)
    @JoinColumn({ name: 'customer_id' })
    customer: CustomerEntity;

    // @ManyToMany(() => ProductEntity, product => product.purchase_products)
    // @JoinTable({
    //     name: 'purchase_products',
    //     joinColumn: { name: 'purchase_id'},
    //     inverseJoinColumn: { name: 'product_id'}
    // })
    // purchase_products: ProductEntity[];
}
