import { Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    validate(payload: any): Promise<User>;
}
export {};
