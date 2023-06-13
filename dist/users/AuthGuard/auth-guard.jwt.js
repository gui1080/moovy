"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuardJwt = void 0;
const passport_1 = require("@nestjs/passport");
class AuthGuardJwt extends (0, passport_1.AuthGuard)('jwt') {
}
exports.AuthGuardJwt = AuthGuardJwt;
//# sourceMappingURL=auth-guard.jwt.js.map