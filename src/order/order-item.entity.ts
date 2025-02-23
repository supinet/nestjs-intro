import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { OrderEntity } from "./order.entity";
import { ProductEntity } from "../product/product.entity";

@Entity( { name: 'orders_items' })
export class OrderItemEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ name: 'quantity', nullable: false })
    quantity: number;

    @Column({ name: 'value', nullable: false })
    value: number;

    @ManyToOne(() => OrderEntity, (order) => order.orderItems, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: "order_id" })
    order: OrderEntity;

    @ManyToOne(() => ProductEntity, (product) => product.orderItems, {
        cascade: ['update']
    })
    @JoinColumn({ name: "product_id" })
    product: ProductEntity;
}
