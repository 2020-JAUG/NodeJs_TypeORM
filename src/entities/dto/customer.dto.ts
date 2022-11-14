import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { UserEntity } from "../user.entity";

export class CustomerDto extends BaseDTO {

    //@IsNotEmpty()
    //address: string;

    @IsNotEmpty()
    identity_card: string;

    @IsNotEmpty()
    user: UserEntity;
}