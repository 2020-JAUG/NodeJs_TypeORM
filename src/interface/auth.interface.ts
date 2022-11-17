import { RoleType } from "../entities/dto/user.dto";

export interface PayloadToken {

    role: RoleType;
    userData: string;
}