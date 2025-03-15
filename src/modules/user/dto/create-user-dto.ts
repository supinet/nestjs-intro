import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";
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

    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+)(.{6,30})$/, {
      message: 'message: The password must contain at least one lowercase letter, one uppercase letter, one digit, one special character and be between 6 and 30 characters long',
    })
    password: string;
  
}