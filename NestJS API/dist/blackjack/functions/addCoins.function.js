"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiplyBet = exports.addCoins = void 0;
const addCoins = (user, game, index, mod) => {
    console.log(user.coins);
    console.log(game.bet[index]);
    for (let coin in user.coins) {
        user.coins[`${coin}`] += game.bet[index][`${coin}`] * mod;
    }
    return user.coins;
};
exports.addCoins = addCoins;
const multiplyBet = (bet, mult) => {
    for (let property in bet) {
        bet[property] *= mult;
    }
    return bet;
};
exports.multiplyBet = multiplyBet;
//# sourceMappingURL=addCoins.function.js.map