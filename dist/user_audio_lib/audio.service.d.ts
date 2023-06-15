/// <reference types="multer" />
/// <reference types="node" />
import { User } from 'src/users/user.entity';
import { MovieList } from 'src/omdb/movielist.entity';
import { AudioRepository } from './audio.repository';
import { MovieListRepository } from 'src/omdb/movielist.repository';
export declare class AudioService {
    private readonly audioRepository;
    private readonly movieListRepository;
    constructor(audioRepository: AudioRepository, movieListRepository: MovieListRepository);
    storeAudio(file: Express.Multer.File, user: User, imdbID: any): Promise<string>;
    retrieveSingleAudio(user: User, imdbID: any): Promise<Buffer>;
    retrieveAllUserAudio(user: User): Promise<any>;
    removeUserAudio(user: User, imdbID: any): Promise<void>;
    retrieveMoviesReviewed(user: User): Promise<MovieList[]>;
    retrieveMoviesNotReviewed(user: User): Promise<MovieList[]>;
}
