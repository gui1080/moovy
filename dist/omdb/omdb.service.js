"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OmdbService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let OmdbService = exports.OmdbService = class OmdbService {
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
};
exports.OmdbService = OmdbService = __decorate([
    (0, common_1.Injectable)()
], OmdbService);
//# sourceMappingURL=omdb.service.js.map