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
exports.OmdbService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const movielist_entity_1 = require("./movielist.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let OmdbService = exports.OmdbService = class OmdbService {
    constructor(movieListRepository) {
        this.movieListRepository = movieListRepository;
    }
    async fetchMoviesByName(name) {
        const baseUrl = 'http://www.omdbapi.com';
        const apikey = 'c4666e9f';
        const apiUrl = `${baseUrl}/?apikey=${apikey}&s=${name}&type=movie`;
        const response = await axios_1.default.get(apiUrl);
        for (let i = 0; i < response.data['Search'].length; i++) {
            for (const param of ['Type', 'Year']) {
                delete response.data['Search'][i][param];
            }
        }
        return response.data;
    }
    async addMovieToUserList(input, user) {
        return await this.movieListRepository.save(Object.assign(Object.assign({}, input), { user_id: user.id, user_name: user.username }));
    }
    async deleteMovieFromUserList(imdbID, user) {
        const id = user.id;
        return await this.movieListRepository
            .createQueryBuilder('e')
            .delete()
            .where('imdbID = :imdbID', { imdbID })
            .andWhere('user_id = :id', { id })
            .execute();
    }
    async getMoviesFromUser(user) {
        const id = user.id;
        return await this.movieListRepository.findBy({
            user_id: id
        });
    }
};
exports.OmdbService = OmdbService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movielist_entity_1.MovieList)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OmdbService);
//# sourceMappingURL=omdb.service.js.map