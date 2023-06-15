/// <reference types="node" />
import { MovieList } from 'src/omdb/movielist.entity';
export declare class Audio {
    id: number;
    data: Buffer;
    filename: string;
    originalname: string;
    mimetype: string;
    size: number;
    made_by_username: string;
    made_by_userid: number;
    about_imdbID: string;
    movie: MovieList;
}
