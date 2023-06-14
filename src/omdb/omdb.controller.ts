import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OmdbService } from './omdb.service';
import { AuthGuardJwt } from 'src/users/AuthGuard/auth-guard.jwt';
import { CurrentUser } from 'src/users/current-user.decorator';
import { User } from 'src/users/user.entity';
import { SaveMovieDto } from './input/save-movie.dto';
import { DeleteMovieDto } from './input/delete-movie.dto';

@Controller('omdb')
export class OmdbController {
    constructor(
        private readonly OmdbService: OmdbService) {}

    // Discovery feature
    // -----------------------
    @Get('/search_movies/:name')
    @UseGuards(AuthGuardJwt)
    async getMovies(@Param('name') name)
    {
        const movies = await this.OmdbService.fetchMoviesByName(name);
        return movies;
    }

    //! search, and get only the best match

    // List managment
    // -----------------------
    @Post('add_movie_to_list')
    @UseGuards(AuthGuardJwt)
    async addToList(
        @Body() input: SaveMovieDto,
        @CurrentUser() user: User
    ) {
        return await this.OmdbService.addMovieToUserList(input, user);
    }

    // search within my movie list
    @Post('/search_list/:movie')
    @UseGuards(AuthGuardJwt)
    async getMoviesFromList(
        @Param('movie') movie, 
        @CurrentUser() user: User 
    ) {
        const movies = await this.OmdbService.fetchMovieListByName(movie, user);
        return movies;
    }

    // delete movie in the list
    @Post('delete_movie_from_list')
    @UseGuards(AuthGuardJwt)
    async deleteFromList(
        @Body() input: DeleteMovieDto,
        @CurrentUser() user: User
    ) {
        return await this.OmdbService.deleteMovieFromUserList(input.imdbID, user);
    }

    // retrieve all movies from authenticated user
    @Post('retrieve_movies_from_current_user')
    @UseGuards(AuthGuardJwt)
    async getFromUser(
        @CurrentUser() user: User
    ) {
        return await this.OmdbService.getMoviesFromUser(user);
    }
    
}
