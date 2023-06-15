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
exports.MovieList = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const audio_entity_1 = require("../user_audio_lib/audio.entity");
let MovieList = exports.MovieList = class MovieList {
    generateId() {
        this.id = (0, uuid_1.v4)();
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MovieList.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MovieList.prototype, "generateId", null);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MovieList.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MovieList.prototype, "imdbID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MovieList.prototype, "poster", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MovieList.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MovieList.prototype, "user_name", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => audio_entity_1.Audio, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", audio_entity_1.Audio)
], MovieList.prototype, "audio", void 0);
exports.MovieList = MovieList = __decorate([
    (0, typeorm_1.Entity)()
], MovieList);
//# sourceMappingURL=movielist.entity.js.map