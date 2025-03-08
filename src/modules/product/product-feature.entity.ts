import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity({ name: 'product_features' })
export class ProductFeatureEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', length: 255, nullable: false })
    name: string;

    @Column({ name: 'description', length: 255, nullable: false })
    description: string;

    @ManyToOne(() => ProductEntity, (product) => product.features,
        { 
            orphanedRowAction: 'delete',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    )
    @JoinColumn( { name: "product_id" })
    product: ProductEntity;
}