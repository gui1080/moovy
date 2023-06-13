import { OmdbService } from './omdb.service';
import { User } from 'src/users/user.entity';
import { SaveMovieDto } from './input/save-movie.dto';
export declare class OmdbController {
    private readonly OmdbService;
    constructor(OmdbService: OmdbService);
    getMovies(name: any): Promise<any>;
    addToList(input: SaveMovieDto, user: User): Promise<import("./movielist.entity").MovieList>;
}
