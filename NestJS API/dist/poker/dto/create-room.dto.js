"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoomDto = void 0;
const common_1 = require("@nestjs/common");
class CreateRoomDto {
    constructor(name, maxPlayers, type, limit, initialBet, turnBet, entryPrice, rakeValue, password, timeout) {
        if (!entryPrice && !rakeValue)
            throw new common_1.HttpException("An entryPrice or rakeValue must be provided when creating a room", 400);
        if (initialBet) {
            if (!turnBet) {
                this.initialBet = initialBet;
                this.turnBet = initialBet * 2;
            }
            else {
                this.turnBet = turnBet;
            }
        }
        else {
            this.initialBet = 0;
            this.turnBet = initialBet * 2;
        }
        this.smallBlind = this.initialBet / 2;
        this.bigBlind = this.initialBet;
        if (name != name)
            throw new common_1.HttpException("Room name contains offensive words", 400);
        this.name = name;
        this.maxPlayers = maxPlayers;
        this.type = type;
        this.entryPrice = entryPrice;
        this.rakeValue = rakeValue;
        this.password = password || undefined;
        this.limit = limit;
        this.dealerIndex = 0;
        this.round = 0;
        this.winners = [];
        this.pot = 0;
        this.timeout = timeout * 1000 || 20000;
        return this;
    }
}
exports.CreateRoomDto = CreateRoomDto;
//# sourceMappingURL=create-room.dto.js.map