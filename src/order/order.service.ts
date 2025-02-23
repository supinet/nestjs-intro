import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order-dto';
import { UpdateOrderDto } from './dto/update-order-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { In, Repository } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { ProductEntity } from 'src/product/product.entity';
import { OrderStatus } from './enum/orderstatus.enum';
import { OrderItemEntity } from './order-item.entity';

@Injectable()
export class OrderService {

  constructor(

    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

  ) { }

  async create(userId: string, orderData: CreateOrderDto) {

    const user = await this.userRepository.findOneBy({ id: userId })
                  ?? (() => { throw new Error('User not found'); }) ();

    const productsId = orderData.orderItems.map((orderItem) => orderItem.productId);

    const productsOrder = await this.productRepository.findBy({ id: In(productsId) });
    
    const orderEntity = new OrderEntity();

    orderEntity.status = OrderStatus.IN_PROCESSING
    orderEntity.user = user;

    const productsOrderItems = orderData.orderItems.map((orderItem) => {
      const productOrder = productsOrder.find((product) => product.id === orderItem.productId);
      
      const productOrderItem = new OrderItemEntity();
      
      if (productOrder) {
        productOrderItem.product = productOrder;
        productOrderItem.value = productOrder.value;
        productOrderItem.quantity = orderItem.quantity;
        productOrderItem.product.availableQuantity -= orderItem.quantity;
      }
      
      return productOrderItem;
    })

    const totalOrder = productsOrderItems.reduce((total, item) => {
      return total + item.value * item.quantity
    }, 0);

    orderEntity.orderItems = productsOrderItems;
    orderEntity.total = totalOrder;

    return await this.orderRepository.save(orderEntity);
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
