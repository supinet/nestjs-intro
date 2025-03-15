import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UniqueEmailValidator } from './validation/unique-email.validator';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity
        ])
    ],
    controllers: [UserController],
    providers: [
        UserService,
        UserRepository,
        UniqueEmailValidator,
    ],
    exports: [
        UserService
    ]
})
export class UserModule {

}