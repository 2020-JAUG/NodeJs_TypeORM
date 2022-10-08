import {BaseDTO} from "../../config/base.dto";
import {IsNotEmpty} from "class-validator";
import {CategoryEntity} from "../category.entity";

export class ProductDto extends BaseDTO {

    @IsNotEmpty()
    product_name!: string;

    @IsNotEmpty()
    description!: string;

    @IsNotEmpty()
    price!: number;

    @IsNotEmpty()
    category!: CategoryEntity;
}