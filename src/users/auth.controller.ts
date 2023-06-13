import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.decorator";
import { User } from "./user.entity";
import { AuthGuardLocal } from "./AuthGuard/auth-guard.local";
import { AuthGuardJwt } from "./AuthGuard/auth-guard.jwt";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    @UseGuards(AuthGuardLocal)
    async login(@CurrentUser() user: User) {

        return {
            userId: user.id,
            token: this.authService.getTokenForUser(user)
        }
    }

    @Get('profile')
    @UseGuards(AuthGuardJwt)
    async getProfile(@CurrentUser() user: User) {

        return user
    
    }

}