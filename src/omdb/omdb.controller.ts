import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OmdbService } from './omdb.service';
import { AuthGuardJwt } from 'src/users/AuthGuard/auth-guard.jwt';
import { CurrentUser } from 'src/users/current-user.decorator';
import { User } from 'src/users/user.entity';
import { SaveMovieDto } from './input/save-movie.dto';

@Controller('omdb')
export class OmdbController {
    constructor(
        private readonly OmdbService: OmdbService) {}

    @Get(':name')
    @UseGuards(AuthGuardJwt)
    async getMovies(@Param('name') name)
    {
        const movies = await this.OmdbService.fetchMoviesByName(name);
        return movies;
    }

    @Post('add_movie_to_list')
    @UseGuards(AuthGuardJwt)
    async addToList(
        @Body() input: SaveMovieDto,
        @CurrentUser() user: User
    ) {
        return await this.OmdbService.addMovieToUserList(input, user);
    }

}
