"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalBet = void 0;
const getTotalBet = (bets) => {
    let totalBet = [];
    for (let i = 0; i < bets.length; i++) {
        let bet = bets[i];
        totalBet[i] = (bet.one + bet.five * 5 + bet.ten * 10 + bet.twentyfive * 25 + bet.fifty * 50 + bet.hundred * 100 + bet.twohundred * 200 + bet.fivehundred * 500 + bet.thousand * 1000);
    }
    return totalBet;
};
exports.getTotalBet = getTotalBet;
//# sourceMappingURL=get-total-bet.function.js.map