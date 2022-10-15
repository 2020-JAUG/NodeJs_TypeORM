import {Column, Entity, JoinColumn, ManyToMany, ManyToOne} from "typeorm";
import {BaseEntity} from "../config/base.entity";
import {CategoryEntity} from "./category.entity";
import {PurchaseEntity} from "./purchase.entity";

@Entity({ name: "products" })
export class ProductEntity extends BaseEntity {

    @ManyToOne(() => CategoryEntity, category => category.products)
    @JoinColumn({ name: 'category_id' })
    category: CategoryEntity;

    // @ManyToMany(() => PurchaseEntity, purchase => purchase.products)
    // purchases: PurchaseEntity[];

    @Column()
    product_name: string;

    @Column()
    description: string;

    @Column()
    price: number
}
