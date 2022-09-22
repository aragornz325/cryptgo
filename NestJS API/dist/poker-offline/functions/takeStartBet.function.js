"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (user, game) => {
    user.balance -= game.startBet;
    return user.balance;
};
//# sourceMappingURL=takeStartBet.function.js.map