import { MovieList } from './movielist.entity';
import { DeleteResult, Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { SaveMovieDto } from './input/save-movie.dto';
export declare class OmdbService {
    private readonly movieListRepository;
    constructor(movieListRepository: Repository<MovieList>);
    fetchMoviesByName(name: any): Promise<any>;
    fetchMovieListByName(movie: any, user: User): Promise<any>;
    addMovieToUserList(input: SaveMovieDto, user: User): Promise<MovieList>;
    deleteMovieFromUserList(imdbID: string, user: User): Promise<DeleteResult>;
    getMoviesFromUser(user: User): Promise<MovieList[]>;
}
