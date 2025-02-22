import { OrderEntity } from "../order/order.entity";
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity( { name: 'users' })
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ name: 'name', length: 255, nullable: false })
    name: string;

    @Column({ name: 'email', length: 150, nullable: false })
    email: string;

    @Column({ name: 'password', length: 255, nullable: false })
    password: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn( { name: 'updated_at' })
    updatedAt: string;

    @DeleteDateColumn( {name: 'deleted_at' })
    deletedAt: string;

    @OneToMany(() => OrderEntity, (order) => order.user)
    orders: OrderEntity[];
    
}