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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokerRoomSchema = exports.PokerRoom = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const pokerRoom_interface_1 = require("../interfaces/pokerRoom.interface");
let PokerRoom = class PokerRoom {
};
__decorate([
    (0, mongoose_1.Prop)({ type: [{}], required: true, default: [] }),
    __metadata("design:type", Array)
], PokerRoom.prototype, "players", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, default: 6 }),
    __metadata("design:type", Number)
], PokerRoom.prototype, "maxPlayers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, default: pokerRoom_interface_1.RoomStatus.OPEN }),
    __metadata("design:type", String)
], PokerRoom.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, default: pokerRoom_interface_1.GameType.PUBLIC, }),
    __metadata("design:type", String)
], PokerRoom.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PokerRoom.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: {}, required: true }),
    __metadata("design:type", Number)
], PokerRoom.prototype, "initialBet", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: {}, required: true }),
    __metadata("design:type", Number)
], PokerRoom.prototype, "turnBet", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], PokerRoom.prototype, "lastRaise", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], PokerRoom.prototype, "raises", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: {} }),
    __metadata("design:type", Number)
], PokerRoom.prototype, "currentBet", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: {} }),
    __metadata("design:type", Number)
], PokerRoom.prototype, "pot", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], PokerRoom.prototype, "round", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], PokerRoom.prototype, "limit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [], required: true }),
    __metadata("design:type", Array)
], PokerRoom.prototype, "deck", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{}] }),
    __metadata("design:type", Array)
], PokerRoom.prototype, "winners", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [], required: true }),
    __metadata("design:type", Array)
], PokerRoom.prototype, "deckHand", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], PokerRoom.prototype, "dealerIndex", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], PokerRoom.prototype, "rakeValue", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], PokerRoom.prototype, "entryPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: {} }),
    __metadata("design:type", Number)
], PokerRoom.prototype, "smallBlind", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: {} }),
    __metadata("design:type", Number)
], PokerRoom.prototype, "bigBlind", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PokerRoom.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], PokerRoom.prototype, "timeout", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], PokerRoom.prototype, "timeoutId", void 0);
PokerRoom = __decorate([
    (0, mongoose_1.Schema)()
], PokerRoom);
exports.PokerRoom = PokerRoom;
exports.PokerRoomSchema = mongoose_1.SchemaFactory.createForClass(PokerRoom);
//# sourceMappingURL=pokerRoom.schema.js.map