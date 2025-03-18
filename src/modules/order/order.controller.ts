import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order-dto';
import { UpdateOrderDto } from './dto/update-order-dto';
import { AuthenticationGuard, RequestWithUser } from '../authentication/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Body() orderData: CreateOrderDto
  ) {
    const userId = req.user.sub;
    return this.orderService.create(
      userId,
      orderData,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }
  
  @Get()
  async findByUser(@Req() req: RequestWithUser) {
    const userId = req.user.sub;
    const orders = await this.orderService.findByUser(userId);
    return {
      message: 'Orders found',
      orders
    }
  }

  @Patch(':id')
  update(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto) {
    const userId = req.user.sub;
    return this.orderService.update(id, updateOrderDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
