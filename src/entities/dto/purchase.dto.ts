import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import {Column} from "typeorm";
import {CustomerEntity} from "../customer.entity";

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

    // @IsNotEmpty()
    // purchase_products: ProductEntity[];
}

export enum StatusPurchase {
    IN_CART = "IN_CART",
    PENDING_PAYMENT = "PENDING_PAYMENT",
    PENDING_APPROVED = "PENDING_APPROVED",
    APPROVED = "APPROVED",
    ERROR = "ERROR",
}