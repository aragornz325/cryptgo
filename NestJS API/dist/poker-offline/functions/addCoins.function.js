"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBet = exports.addBetCoins = exports.addCoins = void 0;
const addCoins = (user, game, mod) => {
    for (let coin in user.coins) {
        user.coins[`${coin}`] += game.startBet[`${coin}`] * mod;
    }
    return user.coins;
};
exports.addCoins = addCoins;
const addBetCoins = (user, bet) => {
    for (let coin in user.coins) {
        user.coins[coin] += bet[coin];
    }
    return user.coins;
};
exports.addBetCoins = addBetCoins;
const addBet = (game, mod) => {
    for (let coin in game.startBet) {
        game.bet[`${coin}`] += game.startBet[`${coin}`] * mod;
    }
    return game.bet;
};
exports.addBet = addBet;
//# sourceMappingURL=addCoins.function.js.map