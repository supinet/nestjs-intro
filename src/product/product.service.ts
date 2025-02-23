import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { Repository } from "typeorm";
import { ListProductDto } from "./dto/list-product-dto";
import { UpdateProductDto } from "./dto/update-product-dto";
import { CreateProductDto } from "./dto/create-product-dto";
import { randomUUID } from "crypto";

export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>) {

        }

        async findAll() {
            const records = await this.productRepository.find();
            const recordsFound = records.map(item => new ListProductDto(
                item.id, item.name, item.value, item.availableQuantity, item.description, item.category
            ));
            return recordsFound;
        }

        async create(productData: CreateProductDto) {
            const product = new ProductEntity();
            product.id = randomUUID();
            product.name = productData.name;
            product.value = productData.value;
            product.availableQuantity = productData.availableQuantity;
            product.description = productData.description;
            product.category = productData.category;
            product.features = productData.features;
            product.images = productData.images;
            await this.productRepository.save(product);
        }

        async update(id: string, productData: UpdateProductDto) {
            const entityName = await this.productRepository.findOneBy({ id });
            Object.assign(entityName ?? {}, productData);
            await this.productRepository.save(productData);
        }

        async delete(id: string) {
            await this.productRepository.delete(id);
        }
}