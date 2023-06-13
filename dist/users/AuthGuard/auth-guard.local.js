"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuardLocal = void 0;
const passport_1 = require("@nestjs/passport");
class AuthGuardLocal extends (0, passport_1.AuthGuard)('local') {
}
exports.AuthGuardLocal = AuthGuardLocal;
//# sourceMappingURL=auth-guard.local.js.map