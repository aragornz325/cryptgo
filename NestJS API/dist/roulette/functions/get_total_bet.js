"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyBet = void 0;
const user_interface_1 = require("../../users/interfaces/user.interface");
const verifyBet = (rouletteBets, user) => {
    let sum = 0;
    rouletteBets.forEach(bet => sum += bet.bet);
    if (sum > user.balance) {
        return false;
    }
    else {
        return sum;
    }
};
exports.verifyBet = verifyBet;
//# sourceMappingURL=get_total_bet.js.map