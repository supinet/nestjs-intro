import { Post, Get, Controller, Body, Put, Param, Delete } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/createProductDto';
import { ProductEntity } from './product.entity';
import { randomUUID } from 'crypto';
import { UpdateProductDto } from './dto/updateProductDto';

@Controller('/products')
export class ProductController {

    constructor(private productRepository: ProductRepository) {}

    @Post()
    async create(@Body() productData: CreateProductDto) {
        const product = new ProductEntity();
        product.id = randomUUID();
        product.name = productData.name;
        product.userId = productData.userId;
        product.value = productData.value;
        product.quantity = productData.quantity;
        product.description = productData.description;
        product.category = productData.category;
        // product.features = productData.features;
        // product.images = productData.images;

        return this.productRepository.create(product);
    }

    @Get()
    async findAll() {
        return this.productRepository.findAll();
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() productData: UpdateProductDto) {
        const productUpdated = await this.productRepository.update(id, productData);
        return {
            product: productUpdated,
            message: 'record updated with success!',
        };
    }

    @Delete('/:id')
    async delete(@Param('id') id: string) {
        const product = await this.productRepository.delete(id);

        return {
            product: product,
            message: 'record deleted with success',
        };
    }
}