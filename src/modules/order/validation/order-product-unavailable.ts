import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "../dto/create-order-dto";
import { ProductEntity } from "src/modules/product/product.entity";

@Injectable()
export class OrderProductUnavailable {
    validate(orderData: CreateOrderDto, productsOrderItems: ProductEntity[]): void {

        orderData.orderItems.forEach((item) => {
            const relatedProduct = productsOrderItems.find(
                (product) => product.id === item.productId,
            );

            if (!relatedProduct) {
                throw new NotFoundException(
                    `Product id ${item.productId} not found`,
                );
            }

            if (item.quantity > relatedProduct.availableQuantity) {
                throw new BadRequestException(
                    `Product id ${relatedProduct.name} is unavailable`,
                )
            }
        })
    }
}
