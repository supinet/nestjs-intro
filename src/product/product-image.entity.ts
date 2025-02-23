import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity({ name: 'product_images' })
export class ProductImageEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'url', length: 255, nullable: false })
    url: string;

    @Column({ name: 'description', length: 255, nullable: false })
    description: string;

    @ManyToOne(() => ProductEntity, (product) => product.images,
        { 
            orphanedRowAction: 'delete',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    )
    @JoinColumn( { name: "product_id" })
    product: ProductEntity;
}