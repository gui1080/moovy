import { AuthService } from "./auth.service";
import { User } from "./user.entity";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(user: User): Promise<{
        userId: number;
        token: string;
    }>;
    getProfile(user: User): Promise<User>;
}
