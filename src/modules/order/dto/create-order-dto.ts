import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsUUID, ValidateNested } from "class-validator";

/**
 * {
	"orderItems": [
		{
			"productId": "c7d8669b-370f-4108-9134-6d988b92a7df",
			"quantity": 14
		}
	]
}
 */
class OrderItemDto {

    @IsUUID()
    productId: string;

    @IsInt()
    quantity: number;
}

export class CreateOrderDto {

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    @Type(() => OrderItemDto)
    orderItems: OrderItemDto[];
}
