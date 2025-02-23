import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order-dto';
import { IsEnum } from 'class-validator';
import { OrderStatus } from '../enum/orderstatus.enum';

export class UpdateOrderDto {

    @IsEnum(OrderStatus)
    status: OrderStatus;
}
