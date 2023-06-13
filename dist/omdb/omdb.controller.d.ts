import { OmdbService } from './omdb.service';
import { User } from 'src/users/user.entity';
import { SaveMovieDto } from './input/save-movie.dto';
import { DeleteMovieDto } from './input/delete-movie.dto';
export declare class OmdbController {
    private readonly OmdbService;
    constructor(OmdbService: OmdbService);
    getMovies(name: any): Promise<any>;
    addToList(input: SaveMovieDto, user: User): Promise<import("./movielist.entity").MovieList>;
    getMoviesFromList(movie: any, user: User): Promise<any>;
    deleteFromList(input: DeleteMovieDto, user: User): Promise<import("typeorm").DeleteResult>;
    getFromUser(user: User): Promise<import("./movielist.entity").MovieList[]>;
}
