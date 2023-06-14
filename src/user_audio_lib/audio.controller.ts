import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/users/current-user.decorator';
import { multerConfig } from 'src/config/multer.config';
import { AudioService } from './audio.service';
import { User } from 'src/users/user.entity';
import { AuthGuardJwt } from 'src/users/AuthGuard/auth-guard.jwt';

@Controller('audio')
export class AudioController {
    constructor(private readonly audioService: AudioService) {}

    // Movie managment
    // -----------------------
    @Post('upload/:imdbID')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(FileInterceptor('file', multerConfig))
    async uploadAudio(
            @UploadedFile() file: Express.Multer.File,  // audio file
            @CurrentUser() user: User,                  // saves audio file to this user bc authentication
            @Param('imdbID') imdbID,                    // the movie the audio refers to
        ) {
        
        console.log(imdbID)
        console.log(user.firstName)
        console.log(file) // undefined

        // save audio
        const audioUrl = await this.audioService.storeAudio(file, user, imdbID);
        
        return { audioUrl };
    }

    // Get one audio about one given movie
    @Get('retrieve/:imdbID')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(FileInterceptor('file', multerConfig))
    async retrieveAudio(
            @UploadedFile() file: Express.Multer.File,  // audio file
            @CurrentUser() user: User,                  // user can only get his audio data
            @Param('imdbID') imdbID,                    // movie the audio refers to
        ) {
        

        // retrieve audio
        const audio = await this.audioService.retrieveSingleAudio(user, imdbID);
        
        return { audio };

    }

    // Get all audios that belong to an user
    @Get('retrieveAll')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(FileInterceptor('file', multerConfig))
    async retrieveAllUserAudio(
            @CurrentUser() user: User,                  // user can only get his audio list
        ) {

        // retrieve audio
        const audios = await this.audioService.retrieveAllUserAudio(user);
        
        return { audios };

    }

    // Delete one of user's audios
    @Post('deleteAudio/:imdbID')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(FileInterceptor('file', multerConfig))
    async deleteUserAudio(
            @CurrentUser() user: User,                  // user can only get his audio list
            @Param('imdbID') imdbID,
        ) {

        // remove audio
        await this.audioService.removeUserAudio(user, imdbID);
    }
    
    // list of movies reviewed
    // Gives back a list of movies!
    @Get('retrieveMoviesReviewed')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(FileInterceptor('file', multerConfig))
    async retrieveMoviesReviewed(
            @CurrentUser() user: User,                  // user can only get his audio list
        ) {

        // retrieve movies
        const movies = await this.audioService.retrieveMoviesReviewed(user);
        
        return { movies };

    }

    // list of movies that still need a review
    // Gives back a list of movies!
    @Get('retrieveMoviesNotReviewed')
    @UseGuards(AuthGuardJwt)
    @UseInterceptors(FileInterceptor('file', multerConfig))
    async retrieveMoviesNotReviewed(
            @CurrentUser() user: User,                  // user can only get his audio list
        ) {

        // retrieve movies
        const movies = await this.audioService.retrieveMoviesNotReviewed(user);
        
        return { movies };

    }

}