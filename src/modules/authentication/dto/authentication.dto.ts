import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthenticationDto {
    
    @IsEmail(undefined, { message: 'The e-mail is invalid' })
    email: string;

    @IsNotEmpty({ message: 'The password cannot be empty' })
    password: string;
}
