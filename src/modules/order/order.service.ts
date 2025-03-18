import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order-dto';
import { UpdateOrderDto } from './dto/update-order-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { In, Repository } from 'typeorm';
import { UserEntity } from 'src/modules/user/user.entity';
import { ProductEntity } from 'src/modules/product/product.entity';
import { OrderStatus } from './enum/orderstatus.enum';
import { OrderItemEntity } from './order-item.entity';
import { ListOrderDto } from './dto/list-order-dto';
import { OrderProductUnavailable } from './validation/order-product-unavailable';

@Injectable()
export class OrderService {

  constructor(

    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    private readonly orderProductUnavailable: OrderProductUnavailable,

  ) { }


  async create(userId: string, orderData: CreateOrderDto) {

    const user = await this.userRepository.findOneBy({ id: userId })
                  ?? (() => { throw new NotFoundException('User not found'); }) ();

    const productsId = orderData.orderItems.map((orderItem) => orderItem.productId);

    const productsOrder = await this.productRepository.findBy({ id: In(productsId) });

    this.orderProductUnavailable.validate(orderData, productsOrder)

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

  async findAll() {
    const orders = await this.orderRepository.find();
    const ordersFounded = orders.map(order => new ListOrderDto(order.id, order.total));
    return ordersFounded;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto, userId: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: { user: true },
    }) ?? (() => { throw new NotFoundException('Order not found'); }) ();

    if (order.user.id != userId)
      throw new ForbiddenException(`You are not authorized to update this order`);

    Object.assign(order ?? {}, <OrderEntity> updateOrderDto);
    return this.orderRepository.save(order);
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async findByUser(userId: string) {
    await this.findUser(userId);
    return this.orderRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        user: true
      },
    });
  }

  private async findUser(id: string) {
    return this.userRepository.findOneBy({ id }) ?? new NotFoundException('User not found');
  }
}
