import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { User } from "./user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: 'tarken',
                signOptions: {
                    expiresIn: '60m'
                }
            })
        })
    ],
    providers: [LocalStrategy, AuthService],
    controllers: [AuthController]
})
export class AuthModule { }