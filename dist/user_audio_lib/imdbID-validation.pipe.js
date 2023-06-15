"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imdbIDValidationPipe = void 0;
const common_1 = require("@nestjs/common");
let imdbIDValidationPipe = exports.imdbIDValidationPipe = class imdbIDValidationPipe {
    transform(value) {
        if (!value || typeof value !== 'string') {
            throw new common_1.BadRequestException('imdbID must be a string!');
        }
        const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,15}$/;
        const isValid = regex.test(value);
        if (!isValid) {
            throw new common_1.BadRequestException('imdbID string must contain both letters and numbers, and have a length between 5 and 15 characters');
        }
        return value;
    }
};
exports.imdbIDValidationPipe = imdbIDValidationPipe = __decorate([
    (0, common_1.Injectable)()
], imdbIDValidationPipe);
//# sourceMappingURL=imdbID-validation.pipe.js.map