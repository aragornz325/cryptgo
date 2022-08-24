"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBets = void 0;
const checkBets = (userCoins, bet) => {
    for (let property in userCoins) {
        console.log(userCoins[property], bet[property]);
        if (userCoins[property] < bet[property]) {
            return { error: `You don't have enough ${property} coins` };
        }
    }
    return;
};
exports.checkBets = checkBets;
//# sourceMappingURL=checkBets.function.js.map