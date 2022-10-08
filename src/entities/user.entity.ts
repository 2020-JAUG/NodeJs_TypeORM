import { BaseEntity } from "../config/base.entity";
import { Column, Entity, OneToOne } from "typeorm";
import { RoleType } from "./dto/user.dto";
import {CustomerEntity} from "./customer.entity";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {

    @Column()
    name: string;

    @Column({ name: "last_name" })
    last_name: string;

    @Column({ name: "user_name" })
    user_name: string;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    city: string;

    @Column()
    province: string;

    @Column({ type: "enum", enum: RoleType, nullable: false })
    role: RoleType;

    @OneToOne(() => CustomerEntity, customer => customer.user)
    customer: CustomerEntity;
}
