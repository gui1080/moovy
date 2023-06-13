import { JwtService } from "@nestjs/jwt";
import { User } from "./user.entity";
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    getTokenForUser(user: User): string;
    hashPassword(password: string): Promise<string>;
}
