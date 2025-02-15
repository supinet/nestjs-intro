import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {

    private users: UserEntity[] = [];

    async create(user: UserEntity) {
        this.users.push(user);
        return user;
    }

    async findAll() {
        return this.users;
    }

    async update(id: string, updateData: Partial<UserEntity>) {
        
        const user = this.findById(id);

        Object.entries(updateData).forEach(([key, value]) => {
            if (key === 'id') {
                return;
            }

            user[key] = value;
        });

        return user;
    }

    async delete(id: string) {
        const user = this.findById(id);
        this.users = this.users.filter(item => item.id !== id);
        return user;
    }

    async existWithEmail(email: string) {
        const exists = this.users.find(user => user.email === email);
        return exists !== undefined;
    }

    private findById(id: string) {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new Error('Record not found');
        }
        return user;
    }
}