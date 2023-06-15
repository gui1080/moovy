"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const audio_entity_1 = require("./audio.entity");
const fs_1 = require("fs");
const movielist_entity_1 = require("../omdb/movielist.entity");
let AudioService = exports.AudioService = class AudioService {
    constructor(audioRepository, movieListRepository) {
        this.audioRepository = audioRepository;
        this.movieListRepository = movieListRepository;
    }
    async storeAudio(file, user, imdbID) {
        const movie_on_list = await this.movieListRepository.findOne({
            where: [
                {
                    user_id: user.id,
                    imdbID: imdbID
                }
            ]
        });
        const old_audio = await this.audioRepository.findOne({
            where: [
                {
                    made_by_userid: user.id,
                    about_imdbID: imdbID
                }
            ]
        });
        if (old_audio) {
            throw new common_1.NotFoundException('There is an audio for this movie already! Do not upload twice!');
        }
        else {
            console.log(movie_on_list);
            if (movie_on_list) {
                const audioData = (0, fs_1.readFileSync)(file.path);
                const audio = this.audioRepository.create({
                    filename: file.filename,
                    data: audioData,
                    originalname: file.originalname,
                    mimetype: file.mimetype,
                    size: file.size,
                    made_by_username: user.username,
                    made_by_userid: user.id,
                    about_imdbID: imdbID,
                    movie: movie_on_list
                });
                await this.audioRepository.save(audio);
                movie_on_list.audio = audio;
                await this.movieListRepository.save(movie_on_list);
                return `/audio/${audio.id}`;
            }
            else {
                throw new common_1.NotFoundException('Watch the movie first, and then write a review for It!');
            }
        }
    }
    async retrieveSingleAudio(user, imdbID) {
        const audio = await this.audioRepository.findOne({
            where: [
                {
                    made_by_userid: user.id,
                    about_imdbID: imdbID
                }
            ]
        });
        return audio.data;
    }
    async retrieveAllUserAudio(user) {
        const id = user.id;
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
    async removeUserAudio(user, imdbID) {
        const audio = await this.audioRepository.findOne({
            where: [
                {
                    made_by_userid: user.id,
                    about_imdbID: imdbID
                }
            ],
            order: {
                originalname: 'ASC',
            },
        });
        if (!audio) {
            throw new common_1.NotFoundException('Audio not found!');
        }
        else {
            await this.audioRepository.remove(audio);
        }
    }
    async retrieveMoviesReviewed(user) {
        const id = user.id;
        const imdb_list = await this.audioRepository.find({
            select: ['about_imdbID'],
            where: [
                {
                    made_by_userid: id
                }
            ],
            order: {
                originalname: 'ASC',
            },
        });
        const imdbIDs = imdb_list.map(movie => movie.about_imdbID);
        const movies_reviewd = await this.movieListRepository.findBy({ imdbID: (0, typeorm_2.In)(imdbIDs) });
        return movies_reviewd;
    }
    async retrieveMoviesNotReviewed(user) {
        const id = user.id;
        const imdb_list = await this.audioRepository.find({
            select: ['about_imdbID'],
            where: [
                {
                    made_by_userid: id
                }
            ],
            order: {
                originalname: 'ASC',
            },
        });
        const imdbIDs = imdb_list.map(movie => movie.about_imdbID);
        const movies_reviewd = await this.movieListRepository.findBy({ imdbID: (0, typeorm_2.Not)((0, typeorm_2.In)(imdbIDs)) });
        return movies_reviewd;
    }
};
exports.AudioService = AudioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(audio_entity_1.Audio)),
    __param(1, (0, typeorm_1.InjectRepository)(movielist_entity_1.MovieList)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AudioService);
//# sourceMappingURL=audio.service.js.map