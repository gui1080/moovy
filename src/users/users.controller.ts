import { Controller, Body, Post, BadRequestException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./input/create.user.dto";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Controller('users')
export class UsersController{
    constructor(
        
        private readonly authService: AuthService,
        
        @InjectRepository(User)
        private readonly userRepository: Repository<User>

        ) {}

    @Post('create_user')
    async create(@Body() createUserDto: CreateUserDto){
        const user = new User();

        if(createUserDto.password !== createUserDto.retypedPassword){
            throw new BadRequestException(['Passwords do not match!']);
        }

        // email and user must be unique

        const existing_user = await this.userRepository.findOne({
            where: [
                {username: createUserDto.username},
                {email: createUserDto.email}
            ]
        })

        if(existing_user){
            throw new BadRequestException(['User already exists!']);
        }

        // associate dto to new user
        user.username = createUserDto.username;
        user.password = await this.authService.hashPassword(createUserDto.password);
        user.email = createUserDto.email;
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;

        // save
        return{
            ...(await this.userRepository.save(user)),
            // immediate authentication when registering
            token: this.authService.getTokenForUser(user)
        }

    }

}