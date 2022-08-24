"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseCoins = void 0;
const reverseCoins = (coins) => {
    for (let coin in coins) {
        coins[coin] = -coins[coin];
    }
    return coins;
};
exports.reverseCoins = reverseCoins;
//# sourceMappingURL=reverseCoins.function.js.map