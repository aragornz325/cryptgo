"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (user, game, index, mod) => {
    user.balance = user.balance + game.bet[index] * mod;
    return user.balance;
};
//# sourceMappingURL=addBalance.function.js.map