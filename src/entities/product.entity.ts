import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany} from "typeorm";
import {BaseEntity} from "../config/base.entity";
import {CategoryEntity} from "./category.entity";

@Entity({ name: "products" })
export class ProductEntity extends BaseEntity {

    @Column()
    product_name: string;

    @Column()
    description: string;

    @Column()
    price: number

    @ManyToOne(() => CategoryEntity, category => category.products)
    @JoinColumn({ name: 'category_id' })
    category: CategoryEntity;

}
