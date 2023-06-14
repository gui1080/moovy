import { Body, Controller, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/users/current-user.decorator';
import { multerConfig } from 'src/config/multer.config';
import { AudioService } from './audio.service';
import { User } from 'src/users/user.entity';
import { AuthGuardJwt } from 'src/users/AuthGuard/auth-guard.jwt';

@Controller('audio')
export class AudioController {
    constructor(private readonly audioService: AudioService) {}

    @Post('upload/:imdbID')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(FileInterceptor('file', multerConfig))
    async uploadAudio(
            @UploadedFile() file: Express.Multer.File,
            @CurrentUser() user: User, 
            @Param('imdbID') imdbID,
        ) {
        
        console.log(imdbID)
        console.log(user.firstName)
        console.log(file) // undefined

        // save audio
        const audioUrl = await this.audioService.storeAudio(file, user, imdbID);
        
        return { audioUrl };
    }
}