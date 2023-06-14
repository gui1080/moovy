import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { MovieList } from './movielist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { SaveMovieDto } from './input/save-movie.dto';

@Injectable()
export class OmdbService {

  private readonly logger = new Logger(OmdbService.name);
  
  constructor(
    @InjectRepository(MovieList)
    private readonly movieListRepository: Repository<MovieList>
  ) { }
  
  // /omdb/search_movies/:name
  async fetchMoviesByName(name): Promise<any> {

    // URL
    const baseUrl = 'http://www.omdbapi.com';
    const apikey = process.env.OMDB_KEY;
    const apiUrl = `${baseUrl}/?apikey=${apikey}&s=${name}&type=movie`;

    // get data from open movie database
    const response = await axios.get(apiUrl);

    // no need to keep track of type and year
    // year is not shown to user and type is always "movie"
    for (let i = 0; i < response.data['Search'].length; i++){
      
      for (const param of ['Type', 'Year']) {
        delete response.data['Search'][i][param];
      }
    
    }

    return response.data
  }

  // /omdb/search_list/:name
  async fetchMovieListByName(movie, user: User): Promise<any> {
    
    const id = user.id;

    // find all movies in list from this user
    return await this.movieListRepository.find({
      where: [
        {
          user_id: id,
          title: ILike(`%${movie}%`)
        }
      ]
    });

  }

  // /omdb/add_movie_to_list
  async addMovieToUserList(input: SaveMovieDto, user: User): Promise<MovieList>{

    // check If this input.imdbID is valid at all
    
    // URL
    const baseUrl = 'http://www.omdbapi.com';
    const apikey = process.env.OMDB_KEY;
    const apiUrl = `${baseUrl}/?apikey=${apikey}&i=${input.imdbID}&type=movie`;

    // get data from open movie database
    const response = await axios.get(apiUrl);

    if(response.data["Response"] == "False"){

      this.logger.debug(`Imdb movie ID ${input.imdbID} does not exist!`);
      throw new UnauthorizedException();

    }
    else{

      // user can't add same movie twice
      const old_movie = await this.movieListRepository.findOne({
        where: [
          { 
            user_id: user.id,
            imdbID: input.imdbID
          }
        ]
      });

      if(!old_movie){

        return await this.movieListRepository.save({
          ...input,
          user_id: user.id,
          user_name: user.username
        });

      }
      else{

        this.logger.debug(`Imdb movie ID ${input.imdbID} is already on user's list!`);
        throw new UnauthorizedException();

      }

    }
    
  }

  // /omdb/delete_movie_from_list
  async deleteMovieFromUserList(imdbID: string, user: User): Promise<DeleteResult>{
    
    const id = user.id;

    // check If movie exists
    const old_movie = await this.movieListRepository.findOne({
      where: [
        { 
          user_id: id,
          imdbID: imdbID
        }
      ]
    });

    // If movie exists
    if(old_movie){

      // find in movie list
      // movie with the id and username given and delete It
      return await this.movieListRepository
      .createQueryBuilder('e')
      .delete()
      .where('imdbID = :imdbID', { imdbID })
      .andWhere('user_id = :id', { id })
      .execute();
    }
    else{

      this.logger.debug(`Imdb movie ID ${imdbID} is not on user's list, so It cannot be deleted!`);
      throw new UnauthorizedException();

    }
  
  }
  
  // /omdb/retrieve_movies_from_current_user
  async getMoviesFromUser(user: User){
    
    const id = user.id;

    // find all movies in list from this user
    return await this.movieListRepository.findBy({
      user_id: id
    });
    
  }
  
}
