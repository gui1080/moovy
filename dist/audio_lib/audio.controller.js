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
exports.AudioController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const current_user_decorator_1 = require("../users/current-user.decorator");
const multer_config_1 = require("../config/multer.config");
const audio_service_1 = require("./audio.service");
const user_entity_1 = require("../users/user.entity");
const auth_guard_jwt_1 = require("../users/AuthGuard/auth-guard.jwt");
let AudioController = exports.AudioController = class AudioController {
    constructor(audioService) {
        this.audioService = audioService;
    }
    async uploadAudio(file, user, imdbID) {
        console.log(imdbID);
        console.log(user.firstName);
        console.log(file);
        const audioUrl = await this.audioService.storeAudio(file, user, imdbID);
        return { audioUrl };
    }
};
__decorate([
    (0, common_1.Post)('upload/:imdbID'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', multer_config_1.multerConfig)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Param)('imdbID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User, Object]),
    __metadata("design:returntype", Promise)
], AudioController.prototype, "uploadAudio", null);
exports.AudioController = AudioController = __decorate([
    (0, common_1.Controller)('audio'),
    __metadata("design:paramtypes", [audio_service_1.AudioService])
], AudioController);
//# sourceMappingURL=audio.controller.js.map