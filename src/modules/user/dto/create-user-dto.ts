import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { UniqueEmail } from "../validation/unique-email.validator";

/**
 * {
	"name": "Jhon",
	"email": "j@j.com",
	"password": "123456"
   }
 */
export class CreateUserDto {
    
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @UniqueEmail({ message: 'email already registered' })
    email: string;

    @MinLength(6)
    password: string;
}