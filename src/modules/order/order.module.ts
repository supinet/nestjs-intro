import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { OrderItemEntity } from './order-item.entity';
import { UserEntity } from 'src/modules/user/user.entity';
import { ProductEntity } from 'src/modules/product/product.entity';
import { OrderProductUnavailable } from './validation/order-product-unavailable';

@Module({
  imports: [TypeOrmModule.forFeature([
    OrderEntity,
    OrderItemEntity,
    UserEntity,
    ProductEntity,
  ])],
  controllers: [
    OrderController
  ],
  providers: [
    OrderService,
    OrderProductUnavailable
  ],
})
export class OrderModule {}
