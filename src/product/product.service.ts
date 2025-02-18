import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { Repository } from "typeorm";
import { ListProductDto } from "./dto/listProductDto";

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
}