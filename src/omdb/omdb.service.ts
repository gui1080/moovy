import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { MovieList } from './movielist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { SaveMovieDto } from './input/save-movie.dto';
import { DeleteMovieDto } from './input/delete-movie.dto';

@Injectable()
export class OmdbService {

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
    

    // !! fix this filter

    // find all movies in list from this user
    return await this.movieListRepository.find({
      where: [
        {
          user_id: id
        },
        {
          title: Like(`%${movie}%`)
        }
      ]
    });

  }

  // /omdb/add_movie_to_list
  async addMovieToUserList(input: SaveMovieDto, user: User): Promise<MovieList>{

    // !! user can't add same movie twice

    return await this.movieListRepository.save({
      ...input,
      user_id: user.id,
      user_name: user.username
    });
  }

  // /omdb/delete_movie_from_list
  async deleteMovieFromUserList(imdbID: string, user: User): Promise<DeleteResult>{
    
    const id = user.id;

    // find in movie list
    // movie with the id and username given and delete It
    return await this.movieListRepository
      .createQueryBuilder('e')
      .delete()
      .where('imdbID = :imdbID', { imdbID })
      .andWhere('user_id = :id', { id })
      .execute();
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
