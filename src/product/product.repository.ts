import { Injectable } from '@nestjs/common'
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {

    private products: ProductEntity[] = []; 
    
    async create(product: ProductEntity) {
        this.products.push(product);
        return product;
    }

    async findAll() {
        return this.products;
    }

    async update(id: string, productData: Partial<ProductEntity>) {
        const dataNotUpdateAble = ['id', 'userId'];
        const product = this.findById(id);
        Object.entries(productData).forEach(([key, value]) => {
            if (dataNotUpdateAble.includes(key)) {
                return;
            }
            product[key] = value;
        })
        return product;
    }

    async delete(id: string) {
        const product = this.findById(id);
        this.products = this.products.filter((item) => item.id !== id);
        return product;
    }

    private findById(id: string) {
        const record = this.products.find((product) => product.id === id);
        if (!record) {
            throw new Error('Record not found');
        }
        return record;
    }
}