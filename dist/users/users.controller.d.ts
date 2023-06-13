import { AuthService } from "./auth.service";
import { CreateUserDto } from "./input/create.user.dto";
import { User } from "./user.entity";
import { Repository } from "typeorm";
export declare class UsersController {
    private readonly authService;
    private readonly userRepository;
    constructor(authService: AuthService, userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<{
        token: string;
        id: number;
        username: string;
        password: string;
        email: string;
        firstName: string;
        lastName: string;
    }>;
}
