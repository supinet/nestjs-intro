import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { UniqueEmail } from "../validation/unique-email.validator";

export class CreateUserDto {
    
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @UniqueEmail({ message: 'email already registered' })
    email: string;

    @MinLength(6)
    password: string;
}