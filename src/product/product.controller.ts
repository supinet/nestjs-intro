import { Post, Get, Controller, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product-dto';
import { ProductEntity } from './product.entity';
import { randomUUID } from 'crypto';
import { UpdateProductDto } from './dto/update-product-dto';
import { ProductService } from './product.service';

@Controller('/products')
export class ProductController {

    constructor(
        private productService: ProductService

    ) {}

    @Post()
    async create(@Body() productData: CreateProductDto) {
        return this.productService.create(productData);
    }

    @Get()
    async findAll() {
        return this.productService.findAll();
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() productData: UpdateProductDto) {
        const productUpdated = await this.productService.update(id, productData);
        return {
            product: productUpdated,
            message: 'record updated with success!',
        };
    }

    @Delete('/:id')
    async delete(@Param('id') id: string) {
        const product = await this.productService.delete(id);

        return {
            product: product,
            message: 'record deleted with success',
        };
    }
}