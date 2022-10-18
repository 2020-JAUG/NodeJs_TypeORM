import {BaseEntity} from "../config/base.entity";
import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {CustomerEntity} from "./customer.entity";

@Entity({ name: "addresses"})
export class AddressEntity extends BaseEntity {

    // @ManyToOne(() => CustomerEntity, customer => customer.addresses)
    // @JoinColumn({ name: 'customer_id'})
    // customer: CustomerEntity;

    @Column()
    street_name: string;

    @Column()
    number: string;

    @Column()
    staircase: string;

    @Column()
    floor: string;

    @Column()
    door: string;

    @Column()
    postal_code: number;

    @Column()
    locality: string;

    @Column()
    province: string;

    @Column()
    country: string;
}