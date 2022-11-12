import { IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { PurchaseEntity } from "../purchase.entity";
import { ProductEntity } from "../product.entity";

export class PurchaseProductPurchaseDTO extends BaseDTO {
    @IsNotEmpty()
    quantityProduct!: number;

    @IsOptional()
    totalPrice?: number;

    @IsOptional()
    purchase?: PurchaseEntity;

    @IsOptional()
    product?: ProductEntity;
}