import { Controller, Get, Param } from '@nestjs/common';
import { OmdbService } from './omdb.service';

@Controller('omdb')
export class OmdbController {
    constructor(private readonly OmdbService: OmdbService) {}

    @Get(':name')
    async getMovies(@Param('name') name){
        const movies = await this.OmdbService.fetchMoviesByName(name);
        return movies;
    }

}
