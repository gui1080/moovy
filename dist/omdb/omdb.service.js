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
var OmdbService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OmdbService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const movielist_entity_1 = require("./movielist.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let OmdbService = exports.OmdbService = OmdbService_1 = class OmdbService {
    constructor(movieListRepository) {
        this.movieListRepository = movieListRepository;
        this.logger = new common_1.Logger(OmdbService_1.name);
    }
    async fetchMoviesByName(name) {
        const baseUrl = 'http://www.omdbapi.com';
        const apikey = process.env.OMDB_KEY;
        const apiUrl = `${baseUrl}/?apikey=${apikey}&s=${name}&type=movie`;
        const response = await axios_1.default.get(apiUrl);
        for (let i = 0; i < response.data['Search'].length; i++) {
            for (const param of ['Type', 'Year']) {
                delete response.data['Search'][i][param];
            }
        }
        return response.data;
    }
    async fetchMovieListByName(movie, user) {
        const id = user.id;
        return await this.movieListRepository.find({
            where: [
                {
                    user_id: id,
                    title: (0, typeorm_2.ILike)(`%${movie}%`)
                }
            ],
            order: {
                title: 'ASC',
            },
        });
    }
    async addMovieToUserList(input, user) {
        const baseUrl = 'http://www.omdbapi.com';
        const apikey = process.env.OMDB_KEY;
        const apiUrl = `${baseUrl}/?apikey=${apikey}&i=${input.imdbID}&type=movie`;
        const response = await axios_1.default.get(apiUrl);
        if (response.data["Response"] == "False") {
            this.logger.debug(`Imdb movie ID ${input.imdbID} does not exist!`);
            throw new common_1.UnauthorizedException();
        }
        else {
            const old_movie = await this.movieListRepository.findOne({
                where: [
                    {
                        user_id: user.id,
                        imdbID: input.imdbID
                    }
                ]
            });
            if (!old_movie) {
                return await this.movieListRepository.save(Object.assign(Object.assign({}, input), { user_id: user.id, user_name: user.username }));
            }
            else {
                this.logger.debug(`Imdb movie ID ${input.imdbID} is already on user's list!`);
                throw new common_1.UnauthorizedException();
            }
        }
    }
    async deleteMovieFromUserList(imdbID, user) {
        const id = user.id;
        const old_movie = await this.movieListRepository.findOne({
            where: [
                {
                    user_id: id,
                    imdbID: imdbID
                }
            ]
        });
        if (old_movie) {
            return await this.movieListRepository
                .createQueryBuilder('e')
                .delete()
                .where('imdbID = :imdbID', { imdbID })
                .andWhere('user_id = :id', { id })
                .execute();
        }
        else {
            this.logger.debug(`Imdb movie ID ${imdbID} is not on user's list, so It cannot be deleted!`);
            throw new common_1.UnauthorizedException();
        }
    }
    async getMoviesFromUser(user) {
        const id = user.id;
        return await this.movieListRepository.find({
            where: {
                user_id: id,
            },
            order: {
                title: 'ASC',
            },
        });
    }
};
exports.OmdbService = OmdbService = OmdbService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movielist_entity_1.MovieList)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OmdbService);
//# sourceMappingURL=omdb.service.js.map