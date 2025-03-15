import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/create-user-dto";
import { ListUserDto } from "./dto/list-user-dto";
import { UpdateUserDto } from "./dto/update-user-dto";
import { UserService } from "./user.service";
import { HashPasswordPipe } from "../../resources/pipes/hash-password-pipe";

@Controller('/users')
export class UserController {

    constructor(
        private userService: UserService,
    ) {}

    @Post()
    async create(
        @Body() { password, ...user}: CreateUserDto,
        @Body('password', HashPasswordPipe) hashedPassword: string,
    ) {
        const userCreated = await this.userService.create({
            ...user,
            password: hashedPassword,
         });

        return {
            user: new ListUserDto(userCreated.id, userCreated.name),
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