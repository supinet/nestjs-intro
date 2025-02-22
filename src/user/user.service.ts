import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListUserDto } from './dto/listUserDto'
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dto/updateUserDto";
import { CreateUserDto } from "./dto/createUserDto";
import { v4 as uuid } from 'uuid';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async findAll() {
        const records = await this.userRepository.find();
        const recordsFound = records.map(item => new ListUserDto(item.id, item.name));
        return recordsFound;
    }

    async create(user: CreateUserDto) {
        const userEntity = new UserEntity();
        userEntity.email = user.email;
        userEntity.name  = user.name;
        userEntity.password = user.password;
        return await this.userRepository.save(userEntity);
    }

    async update(id: string, user: UpdateUserDto) {
       await this.userRepository.update(id, user)
    }

    async delete(id: string) {
        await this.userRepository.delete(id);
    }
}