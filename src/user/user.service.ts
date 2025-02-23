import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListUserDto } from './dto/list-user-dto'
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dto/update-user-dto";
import { CreateUserDto } from "./dto/create-user-dto";


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