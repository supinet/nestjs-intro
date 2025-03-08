import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { OrderStatus } from "./enum/orderstatus.enum";
import { UserEntity } from "../user/user.entity";
import { OrderItemEntity } from "./order-item.entity";

@Entity( { name: 'orders' })
export class OrderEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ name: 'total', nullable: false })
    total: number;

    @Column({ name: 'status', enum: OrderStatus, nullable: false })
    status: OrderStatus;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn( { name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn( {name: 'deleted_at' })
    deletedAt: string;

    @ManyToOne(() => UserEntity, (user) => user.orders)
    @JoinColumn({ name: "user_id" })
    user: UserEntity;
    
    @OneToMany(() => OrderItemEntity, (item) => item.order, {
        cascade: true,
    })
    orderItems: OrderItemEntity[];
}
