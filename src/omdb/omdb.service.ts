import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { MovieList } from './movielist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { SaveMovieDto } from './input/save-movie.dto';

@Injectable()
export class OmdbService {

  constructor(
    @InjectRepository(MovieList)
    private readonly movieListRepository: Repository<MovieList>
  ) { }
  
  async fetchMoviesByName(name): Promise<any> {

    // URL
    const baseUrl = 'http://www.omdbapi.com';
    const apikey = 'c4666e9f';
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

  async addMovieToUserList(input: SaveMovieDto, user: User): Promise<MovieList>{
    console.log(user);
    return await this.movieListRepository.save({
      ...input,
      user_id: user.id,
      user_name: user.username
    });
  }

}
