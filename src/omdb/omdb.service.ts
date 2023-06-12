import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OmdbService {
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
}
