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
let AudioService = exports.AudioService = class AudioService {
    constructor(audioRepository) {
        this.audioRepository = audioRepository;
    }
    async storeAudio(file, user, imdbID) {
        console.log(file);
        console.log(file.path);
        const audioData = (0, fs_1.readFileSync)(file.path);
        const audio = this.audioRepository.create({
            filename: file.filename,
            data: audioData,
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            made_by_username: user.username,
            about_imdbID: imdbID
        });
        await this.audioRepository.save(audio);
        return `/audio/${audio.id}`;
    }
};
exports.AudioService = AudioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(audio_entity_1.Audio)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AudioService);
//# sourceMappingURL=audio.service.js.map