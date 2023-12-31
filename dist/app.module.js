"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const omdb_service_1 = require("./omdb/omdb.service");
const omdb_controller_1 = require("./omdb/omdb.controller");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_config_1 = require("./config/typeorm.config");
const auth_module_1 = require("./users/auth.module");
const movielist_entity_1 = require("./omdb/movielist.entity");
const audio_entity_1 = require("./user_audio_lib/audio.entity");
const audio_controller_1 = require("./user_audio_lib/audio.controller");
const audio_service_1 = require("./user_audio_lib/audio.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("./config/multer.config");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register(multer_config_1.multerConfig),
            typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.typeOrmConfig),
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forFeature([movielist_entity_1.MovieList, audio_entity_1.Audio]),
        ],
        controllers: [omdb_controller_1.OmdbController, audio_controller_1.AudioController],
        providers: [omdb_service_1.OmdbService, audio_service_1.AudioService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map