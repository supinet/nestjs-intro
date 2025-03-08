import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductFeatureEntity } from "./product-feature.entity";
import { ProductImageEntity } from "./product-image.entity";
import { OrderItemEntity } from "../order/order-item.entity";

@Entity({ name: 'products' })
export class ProductEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ name: 'name', length: 255, nullable: false })
    name: string;

    @Column({ name: 'value', nullable: false })
    value: number;

    @Column({ name: 'available_quantity', nullable: false })
    availableQuantity: number;

    @Column({ name: 'description', length: 255, nullable: false })
    description: string;

    @Column({ name: 'category', length: 255, nullable: false })
    category: string;

    @OneToMany(() => ProductFeatureEntity, (productFeatureEntity) => 
        productFeatureEntity.product,
        { cascade: true, eager: true })
    features: ProductFeatureEntity[];

    @OneToMany(() => ProductImageEntity, (productImageEntity) =>
        productImageEntity.product,
        { cascade: true, eager: true })
    images: ProductImageEntity[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;
    
    @UpdateDateColumn( { name: 'updated_at' })
    updatedAt: string;
    
    @DeleteDateColumn( {name: 'deleted_at' })
    deletedAt: string;

    @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
    orderItems: OrderItemEntity[];
}