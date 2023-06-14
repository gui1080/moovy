/// <reference types="multer" />
import { AudioService } from './audio.service';
import { User } from 'src/users/user.entity';
export declare class AudioController {
    private readonly audioService;
    constructor(audioService: AudioService);
    uploadAudio(file: Express.Multer.File, user: User, imdbID: any): Promise<{
        audioUrl: string;
    }>;
    retrieveAudio(file: Express.Multer.File, user: User, imdbID: any): Promise<{
        audio: Buffer;
    }>;
    retrieveAllUserAudio(user: User): Promise<{
        audios: any;
    }>;
    deleteUserAudio(user: User, imdbID: any): Promise<void>;
    retrieveMoviesReviewed(user: User): Promise<{
        movies: import("../omdb/movielist.entity").MovieList[];
    }>;
    retrieveMoviesNotReviewed(user: User): Promise<{
        movies: import("../omdb/movielist.entity").MovieList[];
    }>;
}
