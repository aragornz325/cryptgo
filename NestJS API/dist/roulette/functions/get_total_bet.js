"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyBet = void 0;
const user_interface_1 = require("../../users/interfaces/user.interface");
const verifyBet = (rouletteBets, user) => {
    let totalOneCoins = 0;
    let totalFiveCoins = 0;
    let totalTenCoins = 0;
    let totalTwentyFiveCoins = 0;
    let totalFiftyCoins = 0;
    let totalHundredCoins = 0;
    let totalTwoHundredCoins = 0;
    let totalFiveHundredCoins = 0;
    let totalThousandCoins = 0;
    rouletteBets.forEach(_roulleteBet => {
        totalOneCoins += _roulleteBet.bet["one"];
        totalFiveCoins += _roulleteBet.bet["five"];
        totalTenCoins += _roulleteBet.bet["ten"];
        totalTwentyFiveCoins += _roulleteBet.bet["twentyfive"];
        totalFiftyCoins += _roulleteBet.bet["fifty"];
        totalHundredCoins += _roulleteBet.bet["hundred"];
        totalTwoHundredCoins += _roulleteBet.bet["twohundred"];
        totalFiveHundredCoins += _roulleteBet.bet["fivehundred"];
        totalThousandCoins += _roulleteBet.bet["thousand"];
    });
    if (user.coins.one < totalOneCoins)
        return {
            status: false,
            message: "You don't have enough one coins to bet"
        };
    if (user.coins.five < totalFiveCoins)
        return {
            status: false,
            message: "You don't have enough five coins to bet"
        };
    if (user.coins.ten < totalTenCoins)
        return {
            status: false,
            message: "You don't have enough ten coins to bet"
        };
    if (user.coins.twentyfive < totalTwentyFiveCoins)
        return {
            status: false,
            message: "You don't have enough twentyfive coins to bet"
        };
    if (user.coins.fifty < totalFiftyCoins)
        return {
            status: false,
            message: "You don't have enough fifty coins to bet"
        };
    if (user.coins.hundred < totalHundredCoins)
        return {
            status: false,
            message: "You don't have enough hundred coins to bet"
        };
    if (user.coins.twohundred < totalTwoHundredCoins)
        return {
            status: false,
            message: "You don't have enough twohundred coins to bet"
        };
    if (user.coins.fivehundred < totalFiveHundredCoins)
        return {
            status: false,
            message: "You don't have enough fivehundred coins to bet"
        };
    if (user.coins.thousand < totalThousandCoins)
        return {
            status: false,
            message: "You don't have enough thousand coins to bet"
        };
    return { status: true, message: "Bet is valid", totalCoins: [totalOneCoins, totalFiveCoins, totalTenCoins, totalTwentyFiveCoins, totalFiftyCoins, totalHundredCoins, totalTwoHundredCoins, totalFiveHundredCoins, totalThousandCoins] };
};
exports.verifyBet = verifyBet;
//# sourceMappingURL=get_total_bet.js.map