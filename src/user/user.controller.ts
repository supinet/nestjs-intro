import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/createUserDto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from 'uuid';
import { ListUserDto } from "./dto/listUserDto";
import { UpdateUserDto } from "./dto/updateUserDto";

@Controller('/users')
export class UserController {

    constructor(private userRepository: UserRepository) {}

    @Post()
    async create(@Body() user: CreateUserDto) {
        const userEntity = new UserEntity();
        userEntity.email = user.email;
        userEntity.name  = user.name;
        userEntity.password = user.password;
        userEntity.id = uuid();

        this.userRepository.create(userEntity);

        return {
            user: new ListUserDto(userEntity.id, userEntity.name),
            message: 'record inserted'
        };
    }

    @Get()
    async findAll() {
        const users = await this.userRepository.findAll();
        return users.map(
            user => new ListUserDto(
                user.id,
                user.name
            )
        )
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() user: UpdateUserDto) {
        const userUpdated = await this.userRepository.update(id, user);

        return {
            user: userUpdated,
            message: 'record updated'
        }
    }

    @Delete('/:id')
    async delete(@Param('id') id: string) {
        const user = await this.userRepository.delete(id);
        return {
            user: user,
            message: 'record deleted wiht success'
        }
    }
}