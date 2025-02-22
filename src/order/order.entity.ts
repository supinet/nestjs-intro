import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { OrderStatus } from "./enum/orderstatus.enum";
import { UserEntity } from "../user/user.entity";

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
    user: UserEntity;
}
