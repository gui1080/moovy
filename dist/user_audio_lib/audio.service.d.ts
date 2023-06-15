/// <reference types="multer" />
/// <reference types="node" />
import { Repository } from 'typeorm';
import { Audio } from './audio.entity';
import { User } from 'src/users/user.entity';
import { MovieList } from 'src/omdb/movielist.entity';
export declare class AudioService {
    private readonly audioRepository;
    private readonly movieListRepository;
    constructor(audioRepository: Repository<Audio>, movieListRepository: Repository<MovieList>);
    storeAudio(file: Express.Multer.File, user: User, imdbID: any): Promise<string>;
    retrieveSingleAudio(user: User, imdbID: any): Promise<Buffer>;
    retrieveAllUserAudio(user: User): Promise<any>;
    removeUserAudio(user: User, imdbID: any): Promise<void>;
    retrieveMoviesReviewed(user: User): Promise<MovieList[]>;
    retrieveMoviesNotReviewed(user: User): Promise<MovieList[]>;
}
