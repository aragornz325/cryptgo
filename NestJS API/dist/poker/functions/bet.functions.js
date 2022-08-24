"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundRaiseValue = exports.roundBet = exports.getBet = exports.getPotForRoom = void 0;
async function getPotForRoom(room, raise = false, bet) {
    if (room.limit) {
        if (bet)
            return undefined;
        else {
            room.pot += getBet(room, raise);
            room.markModified('pot');
            return room.pot;
        }
    }
    else {
        if (bet) {
            if (bet - (room.currentBet || roundBet(room)) >= roundRaiseValue(room)) {
                room.pot += bet;
                room.currentBet = bet;
                room.lastRaise = bet - roundRaiseValue(room);
                room.markModified('pot');
                room.markModified('currentBet');
                room.markModified('lastRaise');
            }
            else
                return undefined;
        }
        else {
            let v = getBet(room, raise);
            room.currentBet = v;
            room.pot += v;
            room.markModified('pot');
            room.markModified('currentBet');
            room.markModified('lastRaise');
        }
        return room.pot;
    }
}
exports.getPotForRoom = getPotForRoom;
function getBet(room, raise = false) {
    if (room.limit) {
        if (room.round <= 2)
            return room.initialBet * (raise ? 2 : 1);
        else
            return room.turnBet * (raise ? 2 : 1);
    }
    else {
        if (raise)
            return (room.currentBet || roundBet(room)) + roundRaiseValue(room);
        return (room.currentBet || roundBet(room));
    }
}
exports.getBet = getBet;
function roundBet(room) {
    if (room.round <= 2)
        return room.initialBet;
    else
        return room.turnBet;
}
exports.roundBet = roundBet;
function roundRaiseValue(room) {
    if (room.round <= 2) {
        if (room.lastRaise && room.lastRaise > room.initialBet)
            return room.lastRaise;
        return room.initialBet;
    }
    else {
        if (room.lastRaise && room.lastRaise > room.turnBet)
            return room.lastRaise;
        return room.turnBet;
    }
}
exports.roundRaiseValue = roundRaiseValue;
//# sourceMappingURL=bet.functions.js.map