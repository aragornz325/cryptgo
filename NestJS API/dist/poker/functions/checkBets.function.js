"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBet = void 0;
const bet_interface_1 = require("../../blackjack/interfaces/bet.interface");
const user_interface_1 = require("../../users/interfaces/user.interface");
function checkBet(room, raise, bet, user) {
    if (user.balance) {
        if (!bet)
            return { error: "You have to bet some coins" };
        if (user.balance >= bet)
            return true;
        else
            return { error: "You don't have enough coins" };
    }
    else
        return { error: "User does not have coins" };
}
exports.checkBet = checkBet;
//# sourceMappingURL=checkBets.function.js.map