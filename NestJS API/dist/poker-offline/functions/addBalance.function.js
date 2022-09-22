"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (user, game, mod) => {
    user.balance = user.balance + game.bet * mod;
    return user.balance;
};
//# sourceMappingURL=addBalance.function.js.map