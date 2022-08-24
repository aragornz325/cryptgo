"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokerController = void 0;
const common_1 = require("@nestjs/common");
const create_room_dto_1 = require("./dto/create-room.dto");
const poker_service_1 = require("./poker.service");
let PokerController = class PokerController {
    constructor(pokerService) {
        this.pokerService = pokerService;
    }
    async listRooms(query) {
        return await this.pokerService.listRooms(query).then(async (rooms) => {
            if (!rooms)
                return [];
            return rooms.map((room) => {
                return {
                    name: room.name,
                    status: room.status,
                    type: room.type,
                    maxPlayers: room.maxPlayers,
                    players: room.players.map((p) => { return { userId: p.userId, balance: p.balance }; }),
                    roomId: room._id,
                    entryPrice: room.entryPrice,
                    rake: room.rakeValue,
                };
            });
        });
    }
    async getRoom(params) {
        return await this.pokerService.getRoom(params.roomId).then((room) => {
            return {
                name: room.name,
                status: room.status,
                type: room.type,
                maxPlayers: room.maxPlayers,
                players: room.players.map((p) => { return { userId: p.userId, balance: p.balance }; }),
                roomId: room._id,
                entryPrice: room.entryPrice,
                rake: room.rakeValue,
            };
        });
    }
    async createRoom(data) {
        let gameType = data.type.toUpperCase();
        return await this.pokerService.createRoom(new create_room_dto_1.CreateRoomDto(data.name, data.maxPlayers, gameType, data.limit, data.initialBet, data.turnBet, data.entryPrice, data.rakeValue, data.password, data.timeout)).then((response) => {
            return {
                name: response.name,
                roomId: response.id,
                error: response.error
            };
        });
    }
    deleteRoom(query) {
        if (query.roomId == "*")
            return this.pokerService.deleteAllRooms();
        else
            return this.pokerService.deleteRoom(query.roomId);
    }
};
__decorate([
    (0, common_1.Get)("rooms"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PokerController.prototype, "listRooms", null);
__decorate([
    (0, common_1.Get)("rooms/:roomId"),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PokerController.prototype, "getRoom", null);
__decorate([
    (0, common_1.Post)("room"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PokerController.prototype, "createRoom", null);
__decorate([
    (0, common_1.Delete)("room"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PokerController.prototype, "deleteRoom", null);
PokerController = __decorate([
    (0, common_1.Controller)('api/poker'),
    __metadata("design:paramtypes", [poker_service_1.PokerService])
], PokerController);
exports.PokerController = PokerController;
//# sourceMappingURL=poker.controller.js.map