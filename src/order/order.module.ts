import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { OrderItemEntity } from './order-item.entity';
import { UserEntity } from 'src/user/user.entity';
import { ProductEntity } from 'src/product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    OrderEntity,
    OrderItemEntity,
    UserEntity,
    ProductEntity,
  ])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
