import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { Repository } from "typeorm";
import { ListProductDto } from "./dto/listProductDto";
import { UpdateProductDto } from "./dto/updateProductDto";

export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>) {

        }

        async findAll() {
            const records = await this.productRepository.find();
            const recordsFound = records.map(item => new ListProductDto(
                item.id, item.userId, item.name, item.value, item.quantity, item.description, item.category
            ));
            return recordsFound;
        }

        async create(product: ProductEntity) {
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