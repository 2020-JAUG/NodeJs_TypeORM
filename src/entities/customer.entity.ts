import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import {BaseEntity} from "../config/base.entity";
import {UserEntity} from "./user.entity";
import {PurchaseEntity} from "./purchase.entity";
import {AddressEntity} from "./address.entity";

@Entity({ name: "customers" })
export class CustomerEntity extends BaseEntity {

    @OneToOne(() => UserEntity, user => user.customer)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    // @OneToMany(() => AddressEntity, address => address.customer )
    // addresses: AddressEntity[];

    @OneToMany(() => PurchaseEntity, purchase => purchase.customer)
    purchases: PurchaseEntity[];

    @Column()
    identity_card: string;
}
