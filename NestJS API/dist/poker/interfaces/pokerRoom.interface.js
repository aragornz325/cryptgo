"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokerRoom = exports.GameType = exports.RoomStatus = void 0;
const bet_interface_1 = require("../../blackjack/interfaces/bet.interface");
var RoomStatus;
(function (RoomStatus) {
    RoomStatus["OPEN"] = "OPEN";
    RoomStatus["CLOSED"] = "CLOSED";
    RoomStatus["PLAYING"] = "PLAYING";
    RoomStatus["FINISHED"] = "FINISHED";
})(RoomStatus = exports.RoomStatus || (exports.RoomStatus = {}));
var GameType;
(function (GameType) {
    GameType["PUBLIC"] = "PUBLIC";
    GameType["PRIVATE"] = "PRIVATE";
    GameType["TOURNAMENT"] = "TOURNAMENT";
})(GameType = exports.GameType || (exports.GameType = {}));
class PokerRoom {
}
exports.PokerRoom = PokerRoom;
//# sourceMappingURL=pokerRoom.interface.js.map