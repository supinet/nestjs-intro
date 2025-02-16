import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'product_features' })
export class ProductFeature {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', length: 255, nullable: false })
    name: string;

    @Column({ name: 'description', length: 255, nullable: false })
    description: string;
}