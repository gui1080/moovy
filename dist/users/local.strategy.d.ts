import { Strategy } from "passport-local";
import { UserRepository } from "./user.repository";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly userRepository;
    private readonly logger;
    constructor(userRepository: UserRepository);
    validate(username: string, password: string): Promise<any>;
}
export {};
