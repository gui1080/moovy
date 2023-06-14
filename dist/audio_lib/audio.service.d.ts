/// <reference types="multer" />
import { Repository } from 'typeorm';
import { Audio } from './audio.entity';
import { User } from 'src/users/user.entity';
export declare class AudioService {
    private readonly audioRepository;
    constructor(audioRepository: Repository<Audio>);
    storeAudio(file: Express.Multer.File, user: User, imdbID: any): Promise<string>;
}
