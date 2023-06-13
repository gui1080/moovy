import { IsEmail, Length } from "class-validator";

export class CreateUserDto{
    @Length(5)
    username: string;
    
    @Length(8)
    password: string;
    
    @Length(8)
    retypedPassword: string;
    
    @Length(1)
    firstName: string;
    
    @Length(1)
    lastName: string;
    
    @IsEmail()
    email: string;
}