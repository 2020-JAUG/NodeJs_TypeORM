import {IsNotEmpty, IsOptional} from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import {CustomerEntity} from "../customer.entity";
import {ProductEntity} from "../product.entity";

export class PurchaseDTO extends BaseDTO {
    @IsNotEmpty()
    status!: StatusPurchase;

    @IsNotEmpty()
    payment_method!: string;

    @IsNotEmpty()
    customer!: CustomerEntity;

    @IsNotEmpty()
    quantity_product: number;

    @IsNotEmpty()
    total_price: number;

    @IsOptional()
    products!: ProductEntity[];
}

export enum StatusPurchase {
    IN_CART = "IN_CART",
    PENDING_PAYMENT = "PENDING_PAYMENT",
    PENDING_APPROVED = "PENDING_APPROVED",
    APPROVED = "APPROVED",
    ERROR = "ERROR",
}