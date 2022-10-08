import { IsNotEmpty } from "class-validator";
import { Column } from "typeorm";
import { BaseDTO } from "../../config/base.dto";

export class UserDTO extends BaseDTO {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    user_name: string;

    @IsNotEmpty()
    @Column({ unique: true })
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    province: string;

    @IsNotEmpty()
    role: RoleType;
}

export enum RoleType {
    USER = "USER",
    CUSTOMER = "CUSTOMER",
    ADMIN = "ADMIN",
}
