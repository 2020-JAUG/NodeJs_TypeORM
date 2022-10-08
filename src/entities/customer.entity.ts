import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import {BaseEntity} from "../config/base.entity";
import {UserEntity} from "./user.entity";

@Entity({ name: "customers" })
export class CustomerEntity extends BaseEntity {

    @Column()
    address: string;

    @Column()
    dni: string;

    @OneToOne(() => UserEntity, user => user.customer)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    //@OneToMany(() => PurchaseEntity, purchase => purchase.customer)
    //purchases: PurchaseEntity[];
}
