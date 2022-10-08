import {BaseDTO} from "../../config/base.dto";
import {IsNotEmpty} from "class-validator";

export class CategoryDto extends BaseDTO {

    @IsNotEmpty()
    category_name: string;
}