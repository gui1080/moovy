import { OmdbService } from './omdb.service';
export declare class OmdbController {
    private readonly OmdbService;
    constructor(OmdbService: OmdbService);
    getMovies(name: any): Promise<any>;
}
