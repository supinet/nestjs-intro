import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { Repository } from "typeorm";
import { ListProductDto } from "./dto/list-product-dto";
import { UpdateProductDto } from "./dto/update-product-dto";
import { CreateProductDto } from "./dto/create-product-dto";
import { Inject, NotFoundException } from "@nestjs/common";

export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>
    ) { }

        async findAll() {
            const records = await this.productRepository.find();
            const recordsFound = records.map(item => new ListProductDto(
                item.id, item.name, item.value, item.availableQuantity, item.description, item.category
            ));
            return recordsFound;
        }

        async findById(id: string) {
            return await this.productRepository.findOneBy({ id })
                .then((data) => { return data as ProductEntity } )
        }

        async create(productData: CreateProductDto) {
            const product = new ProductEntity();
            
            Object.assign(product, productData as ProductEntity);
            
            await this.productRepository.save(product);
        }

        async update(id: string, productData: UpdateProductDto) {
            const entityName = await this.productRepository.findOneBy({ id })
                                ?? (() => { throw new NotFoundException('Product not found'); }) ();
            Object.assign(entityName ?? {}, <ProductEntity> productData);
            await this.productRepository.save(entityName);
        }

        async delete(id: string) {
            await this.productRepository.delete(id);
        }
}