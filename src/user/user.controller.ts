import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/createUserDto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from 'uuid';
import { ListUserDto } from "./dto/listUserDto";
import { UpdateUserDto } from "./dto/updateUserDto";
import { UserService } from "./user.service";

@Controller('/users')
export class UserController {

    constructor(
        private userService: UserService,
        private userRepository: UserRepository
    ) {}

    @Post()
    async create(@Body() user: CreateUserDto) {
        const userEntity = new UserEntity();
        userEntity.email = user.email;
        userEntity.name  = user.name;
        userEntity.password = user.password;
        userEntity.id = uuid();

        this.userService.create(userEntity);

        return {
            user: new ListUserDto(userEntity.id, userEntity.name),
            message: 'record inserted'
        };
    }

    @Get()
    async findAll() {
        return await this.userService.findAll();
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() user: UpdateUserDto) {
        const userUpdated = await this.userService.update(id, user);

        return {
            user: userUpdated,
            message: 'record updated'
        }
    }

    @Delete('/:id')
    async delete(@Param('id') id: string) {
        const user = await this.userService.delete(id);
        return {
            user: user,
            message: 'record deleted wiht success'
        }
    }
}