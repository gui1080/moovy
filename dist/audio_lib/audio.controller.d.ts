/// <reference types="multer" />
import { AudioService } from './audio.service';
import { User } from 'src/users/user.entity';
export declare class AudioController {
    private readonly audioService;
    constructor(audioService: AudioService);
    uploadAudio(file: Express.Multer.File, user: User, imdbID: any): Promise<{
        audioUrl: string;
    }>;
}
