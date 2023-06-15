import { EntityRepository, Repository } from 'typeorm';
import { MovieList } from './movielist.entity';

@EntityRepository(MovieList)
export class MovieListRepository extends Repository<MovieList> {}
