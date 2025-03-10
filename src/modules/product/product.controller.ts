import { Post, Get, Controller, Body, Put, Param, Delete, UseInterceptors, Inject } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';
import { ProductService } from './product.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ProductEntity } from './product.entity';

@Controller('/products')
export class ProductController {

    constructor(
        private productService: ProductService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    @Post()
    async create(@Body() productData: CreateProductDto) {
        return this.productService.create(productData);
    }

    @Get()
    async findAll() {
        return this.productService.findAll();
    }

    @Get('/:id')
    async findById(@Param('id') id: string) {
        let product = await this.cacheManager.get<ProductEntity>(
            `product-${id}`,
        )
        console.log(`product from cache ${JSON.stringify(product)}`);
        if (!product) {
            console.log(`getting from cache! ${product}`);
            product = await this.productService.findById(id);
            const cacheData = await this.cacheManager.set(`product-${id}`, product);
            console.log(`cache saved ${JSON.stringify(cacheData)}`);
        }
        return {
            message: `Record goten with success`,
            product,
        }
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