import { Strategy } from "passport-local";
import { Repository } from "typeorm";
import { User } from "./user.entity";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly userRepository;
    private readonly logger;
    constructor(userRepository: Repository<User>);
    validate(username: string, password: string): Promise<any>;
}
export {};
