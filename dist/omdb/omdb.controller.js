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
exports.OmdbController = void 0;
const common_1 = require("@nestjs/common");
const omdb_service_1 = require("./omdb.service");
const auth_guard_jwt_1 = require("../users/AuthGuard/auth-guard.jwt");
const current_user_decorator_1 = require("../users/current-user.decorator");
const user_entity_1 = require("../users/user.entity");
const save_movie_dto_1 = require("./input/save-movie.dto");
let OmdbController = exports.OmdbController = class OmdbController {
    constructor(OmdbService) {
        this.OmdbService = OmdbService;
    }
    async getMovies(name) {
        const movies = await this.OmdbService.fetchMoviesByName(name);
        return movies;
    }
    async addToList(input, user) {
        return await this.OmdbService.addMovieToUserList(input, user);
    }
};
__decorate([
    (0, common_1.Get)(':name'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OmdbController.prototype, "getMovies", null);
__decorate([
    (0, common_1.Post)('add_movie_to_list'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [save_movie_dto_1.SaveMovieDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], OmdbController.prototype, "addToList", null);
exports.OmdbController = OmdbController = __decorate([
    (0, common_1.Controller)('omdb'),
    __metadata("design:paramtypes", [omdb_service_1.OmdbService])
], OmdbController);
//# sourceMappingURL=omdb.controller.js.map