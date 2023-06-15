import { AuthService } from "./auth.service";
import { CreateUserDto } from "./input/create.user.dto";
import { UserRepository } from "./user.repository";
export declare class UsersController {
    private readonly authService;
    private readonly userRepository;
    constructor(authService: AuthService, userRepository: UserRepository);
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
