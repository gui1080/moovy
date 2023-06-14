import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, In, Repository } from 'typeorm';
import { Audio } from './audio.entity';
import { User } from 'src/users/user.entity';
import { readFileSync } from 'fs';
import { MovieList } from 'src/omdb/movielist.entity';

@Injectable()
export class AudioService {
    constructor(
        @InjectRepository(Audio)
        private readonly audioRepository: Repository<Audio>,
        @InjectRepository(MovieList)
        private readonly movieListRepository: Repository<MovieList>
    ) {}
    
    // audio/upload/:imdbID
    async storeAudio(file: Express.Multer.File, user: User, imdbID): Promise<string> {

        // Audio can only be stored If user put this movie on the list
        const movie_on_list = await this.movieListRepository.findOne({
            where: [
                {
                    user_id: user.id,     // if user put the movie...
                    imdbID: imdbID        // ...on his movie list
                }
            ]
        });

        // User cannot upload an audio about the same movie twice
        const old_audio = await this.audioRepository.findOne({
            where: [
                {
                    made_by_userid: user.id,    // find audio made by this user
                    about_imdbID: imdbID        // about this movie in special
                }
            ]
        });

        // If there is already a review about the movie...
        if(old_audio){

            // error
            throw new NotFoundException('There is an audio for this movie already! Do not upload twice!')
        
        }
        else{
            
            // If the user watched and added that movie to his movie list
            if(movie_on_list){

                // audio file itself as binary
                const audioData = readFileSync(file.path);
    
                // Store the file in the database and return the audio URL
                const audio = this.audioRepository.create({
                    filename: file.filename,            // audio metadata
                    data: audioData,
                    originalname: file.originalname,
                    mimetype: file.mimetype,
                    size: file.size,
                    made_by_username: user.username,    // provided by this user
                    made_by_userid: user.id,            // with this user id
                    about_imdbID: imdbID                // about this movie, with this imdbID
                });
                
                await this.audioRepository.save(audio);
    
                return `/audio/${audio.id}`;

            }
            else{
            
                // error!
                throw new NotFoundException('Watch the movie first, and then write a review for It!')
            
            }

        }

    }

    // audio/retrieve/:imdbID
    async retrieveSingleAudio(user: User, imdbID): Promise<Buffer>{
        
        const audio = await this.audioRepository.findOne({
            where: [
                {
                    made_by_userid: user.id,    // find audio made by this user
                    about_imdbID: imdbID        // about this movie in special
                }
            ]
        });
        return audio.data;
        
    }

    // audio/retrieveAll
    async retrieveAllUserAudio(user: User): Promise<any> {
        
        const id = user.id;

        // get all audios that belong to this user
        return await this.audioRepository.find({
            where: [
                {
                    made_by_userid: id
                }
            ],
            order: {
                originalname: 'ASC', 
            },
        });
    } 

    // audio/deleteAudio/:imdbID
    async removeUserAudio(user: User, imdbID): Promise<void>{

        // find audio that should be removed
        const audio = await this.audioRepository.findOne({
            where: [
                {
                    made_by_userid: user.id,    // find audio made by this user
                    about_imdbID: imdbID        // about this movie in special
                }
            ],
            order: {
                originalname: 'ASC', 
            },
        });

        // check if audio is valid and delete It!
        if (!audio) {
            throw new NotFoundException('Audio not found!')
        }
        else{
            await this.audioRepository.remove(audio);
        }

    }
    
    // audio/retrieveMoviesReviewed
    async retrieveMoviesReviewed(user: User): Promise<MovieList[]> {

        const id = user.id;

        // get all imdbID of the movies the user reviewd
        const imdb_list = await this.audioRepository.find({
            select: [ 'about_imdbID' ],
            where: [
                {
                    made_by_userid: id
                }
            ],
            order: {
                originalname: 'ASC', 
            },
        });

        const imdbIDs: string[] = imdb_list.map(movie => movie.about_imdbID);

        // search all the movies by their ids retrieved
        const movies_reviewd = await this.movieListRepository.findBy({ imdbID: In(imdbIDs) });

        return movies_reviewd;
    }

    // audio/retrieveMoviesNotReviewed
    async retrieveMoviesNotReviewed(user: User): Promise<MovieList[]> {

        const id = user.id;

        // get all imdbID of the movies the user reviewd
        const imdb_list = await this.audioRepository.find({
            select: [ 'about_imdbID' ],
            where: [
                {
                    made_by_userid: id
                }
            ],
            order: {
                originalname: 'ASC', 
            },
        });

        const imdbIDs: string[] = imdb_list.map(movie => movie.about_imdbID);

        // search all the movies by their ids retrieved
        const movies_reviewd = await this.movieListRepository.findBy({ imdbID: Not(In(imdbIDs)) });

        return movies_reviewd;
    }

}
