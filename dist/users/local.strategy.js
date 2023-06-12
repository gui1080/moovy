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
var LocalStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const passport_local_1 = require("passport-local");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
let LocalStrategy = exports.LocalStrategy = LocalStrategy_1 = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(userRepository) {
        super();
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(LocalStrategy_1.name);
    }
    async validate(username, password) {
        const user = await this.userRepository.findOne({
            where: { username }
        });
        if (!user) {
            this.logger.debug(`User ${username} not found!`);
            throw new common_1.UnauthorizedException();
        }
        if (password !== user.password) {
            this.logger.debug(`Invalid credentials for user ${username}`);
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
exports.LocalStrategy = LocalStrategy = LocalStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LocalStrategy);
//# sourceMappingURL=local.strategy.js.map