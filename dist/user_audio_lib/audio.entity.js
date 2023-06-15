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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Audio = void 0;
const movielist_entity_1 = require("../omdb/movielist.entity");
const typeorm_1 = require("typeorm");
let Audio = exports.Audio = class Audio {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Audio.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('bytea', { nullable: true }),
    __metadata("design:type", Buffer)
], Audio.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Audio.prototype, "filename", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Audio.prototype, "originalname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Audio.prototype, "mimetype", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Audio.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Audio.prototype, "made_by_username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Audio.prototype, "made_by_userid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Audio.prototype, "about_imdbID", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => movielist_entity_1.MovieList, movie => movie.id),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", movielist_entity_1.MovieList)
], Audio.prototype, "movie", void 0);
exports.Audio = Audio = __decorate([
    (0, typeorm_1.Entity)()
], Audio);
//# sourceMappingURL=audio.entity.js.map