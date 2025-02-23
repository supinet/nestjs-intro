import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { UniqueEmail } from "../validation/unique-email.validator";

export class UpdateUserDto {
    
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @IsEmail()
    @UniqueEmail({ message: 'email already registered' })
    @IsOptional()
    email: string;

    @MinLength(6)
    @IsOptional()
    password: string;
}