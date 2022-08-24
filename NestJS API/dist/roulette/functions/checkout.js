"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOut = void 0;
const addCoins_function_1 = require("../../poker-offline/functions/addCoins.function");
const stats_service_1 = require("../../stats/stats.service");
const user_interface_1 = require("../../users/interfaces/user.interface");
const addCoins = async (user, _bet, multiplier) => {
    const newBet = {
        one: _bet.bet["one"] * multiplier,
        five: _bet.bet["five"] * multiplier,
        ten: _bet.bet["ten"] * multiplier,
        twentyfive: _bet.bet["twentyfive"] * multiplier,
        fifty: _bet.bet["fifty"] * multiplier,
        hundred: _bet.bet["hundred"] * multiplier,
        twohundred: _bet.bet["twohundred"] * multiplier,
        fivehundred: _bet.bet["fivehundred"] * multiplier,
        thousand: _bet.bet["thousand"] * multiplier
    };
    user.coins = (0, addCoins_function_1.addBetCoins)(user, newBet);
    user.markModified('coins');
    return newBet;
};
const checkOut = async (user, roulleteNumber, rouletteBets) => {
    let stat = { one: 0, five: 0, ten: 0, twentyfive: 0, fifty: 0, hundred: 0, twohundred: 0, fivehundred: 0, thousand: 0 };
    let newBets = await rouletteBets.map(async (_bet) => {
        if (_bet.type == 'number') {
            if (_bet.number == roulleteNumber.number) {
                stat = await addCoins(user, _bet, 36);
                _bet.won = true;
            }
            return _bet;
        }
        else if (_bet.type == 'quarter') {
            for (let i = 0; i < roulleteNumber.quarters.length; i++) {
                if (arraysEqual(roulleteNumber.quarters[i], _bet.quarter)) {
                    stat = await addCoins(user, _bet, 9);
                    _bet.won = true;
                }
            }
            return _bet;
        }
        else if (_bet.type == 'double') {
            for (let i = 0; i < roulleteNumber.doubles.length; i++) {
                if (arraysEqual(roulleteNumber.doubles[i], _bet.double)) {
                    stat = await addCoins(user, _bet, 18);
                    _bet.won = true;
                }
            }
            return _bet;
        }
        else if (_bet.type == 'doubleColumns') {
            for (let i = 0; i < roulleteNumber.doubleColumns.length; i++) {
                if (arraysEqual(roulleteNumber.doubleColumns[i], _bet.doubleColumns)) {
                    stat = await addCoins(user, _bet, 5);
                    _bet.won = true;
                }
            }
            return _bet;
        }
        else if (_bet.type == 'isOdd') {
            if (roulleteNumber.isOdd == _bet.isOdd) {
                stat = await addCoins(user, _bet, 2);
                _bet.won = true;
            }
            return _bet;
        }
        else if (_bet.type == 'color') {
            if (roulleteNumber.color.toLowerCase() == _bet.color.toLowerCase()) {
                stat = await addCoins(user, _bet, 2);
                _bet.won = true;
            }
            return _bet;
        }
        else if (_bet.type == 'row') {
            if (roulleteNumber.row == _bet.row) {
                stat = await addCoins(user, _bet, 3);
                _bet.won = true;
            }
            return _bet;
        }
        else if (_bet.type == 'column') {
            if (roulleteNumber.column == _bet.column) {
                stat = await addCoins(user, _bet, 2);
                _bet.won = true;
            }
            return _bet;
        }
        else if (_bet.type == 'lessThanEighteen') {
            if (roulleteNumber.lessThanEighteen == _bet.lessThanEighteen) {
                stat = await addCoins(user, _bet, 2);
                _bet.won = true;
            }
            return _bet;
        }
        else if (_bet.type == 'dozen') {
            if (roulleteNumber.dozens == _bet.dozen) {
                stat = await addCoins(user, _bet, 2);
                _bet.won = true;
            }
            return _bet;
        }
        else {
            _bet.won = false;
            return _bet;
        }
    });
    let verifyStat = false;
    for (let property in stat) {
        if (stat[property] !== 0) {
            verifyStat = true;
        }
    }
    if (!verifyStat) {
        stat = undefined;
    }
    return { newBets, stat };
};
exports.checkOut = checkOut;
function arraysEqual(a, b) {
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    if (a.length !== b.length)
        return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}
//# sourceMappingURL=checkout.js.map