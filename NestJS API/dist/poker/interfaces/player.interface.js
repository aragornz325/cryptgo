"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const user_interface_1 = require("../../users/interfaces/user.interface");
class Player {
    constructor(id, userId, bigBlind) {
        this.bigBlind = bigBlind;
        this.id = id;
        this.userId = userId;
        this.turn = false;
        this.folded = false;
        this.called = false;
        this.checked = false;
        this.connected = true;
    }
}
exports.Player = Player;
//# sourceMappingURL=player.interface.js.map