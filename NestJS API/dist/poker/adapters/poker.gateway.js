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
exports.PokerGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const poker_service_1 = require("../poker.service");
let PokerGateway = class PokerGateway {
    constructor(pokerService) {
        this.pokerService = pokerService;
    }
    async disconnectPlayer(roomId, playerId, message) {
        await this.server.fetchSockets().then(sockets => {
            let socket = sockets.find(socket => socket.id === playerId);
            if (socket) {
                socket.disconnect(true);
            }
        });
    }
    async sendMessage(roomId, message) {
        try {
            this.server.to(roomId).emit('room', message);
        }
        catch (e) {
            console.log(`error sending message "${JSON.stringify(message)}" to room(${roomId}): `, e);
        }
    }
    async handleEvent(data, client) {
        if (typeof data != 'object') {
            try {
                data = JSON.parse(data);
            }
            catch (_a) {
                client.emit("room", { event: 'error', error: "Request failed. Expected a JSON formatted message" });
            }
        }
        if (data.event == "join") {
            this.pokerService.joinRoom(data.roomId, client.id, data.userId, data.password).then((response) => {
                if (response.error) {
                    client.emit("room", { event: 'join', joined: false, error: response.error });
                    client.disconnect(true);
                }
                else {
                    client.join(data.roomId);
                    this.server.to(data.roomId).emit('room', { event: 'join', joined: true, userId: data.userId, bet: data.bet || undefined });
                }
            });
        }
        else if (data.event == "leave") {
            return await this.pokerService.leaveRoom(data.roomId, client.id).then(async (response) => {
                if (response.error) {
                    client.emit("room", { event: 'leave', left: false, error: "Error leaving room" });
                    return false;
                }
                else {
                    this.server.to(data.roomId).emit('room', { event: 'leave', left: true, userId: data.userId });
                    client.leave(data.roomId);
                    client.disconnect(true);
                    return true;
                }
            });
        }
        else if (data.event == "reconnect") {
            await this.pokerService.reconnectPlayer(data.roomId, client.id, data.userId).then(async (response) => {
                if (response.error) {
                    client.emit("room", { event: 'reconnect', reconnected: false, error: response.error });
                }
                else {
                    client.join(data.roomId);
                    this.server.to(data.roomId).emit('room', Object.assign({ event: 'reconnect', reconnected: true, userId: data.userId }, response));
                }
            });
        }
        else if (data.event == "fold") {
            await this.pokerService.fold(data.roomId, data.userId).then((folded) => {
                if (folded) {
                    this.server.to(data.roomId).emit('room', { event: 'fold', userId: data.userId });
                }
                else {
                    client.emit('room', { event: 'fold', folded: false, error: 'You are not allowed to fold' });
                }
            });
        }
        else if (data.event == "bet") {
            await this.pokerService.bet(data.roomId, data.userId, data.raise, data.bet).then((response) => {
                if (response.error) {
                    client.emit('room', { event: 'bet', betted: false, error: response.error });
                }
                else {
                    this.server.to(data.roomId).emit('room', { event: 'bet', userId: data.userId, bet: data.bet });
                }
            });
        }
        else if (data.event == "raise") {
            await this.pokerService.bet(data.roomId, data.userId, true).then((response) => {
                if (response.error) {
                    client.emit('room', { event: 'raise', raised: false, error: response.error });
                }
                else {
                    this.server.to(data.roomId).emit('room', { event: 'raise', userId: data.userId, bet: response.bet });
                }
            });
        }
        else if (data.event == "check") {
            await this.pokerService.check(data.roomId, data.userId).then((checked) => {
                if (checked && !checked.error) {
                    this.server.to(data.roomId).emit('room', { event: 'check', userId: data.userId });
                }
                else {
                    client.emit('room', { event: 'check', checked: false, error: 'You are not allowed to check' });
                }
            });
        }
        else if (data.event == "call") {
            await this.pokerService.call(data.roomId, data.userId).then((response) => {
                if (response.error) {
                    client.emit('room', { event: 'call', called: false, error: response.error });
                }
                else {
                    this.server.to(data.roomId).emit('room', { event: 'call', userId: data.userId, bet: response.bet });
                }
            });
        }
        else if (data.event == "start") {
            this.pokerService.startGame(data.roomId).then((response) => {
                if (response.error != undefined) {
                    client.emit('room', { started: false, error: response.error });
                }
                else {
                    this.server.to(data.roomId).emit('room', Object.assign({ event: 'game_start' }, response));
                }
            });
        }
        else if (data.event == "restart") {
            this.pokerService.restartGame(data.roomId).then((response) => {
                if (response.error != undefined) {
                    client.emit('room', { restarted: false, error: response.error });
                }
                else {
                    this.server.to(data.roomId).emit('room', { event: 'game_restart' });
                }
            });
        }
        else if (data.event == "allIn") {
            await this.pokerService.allIn(data.roomId, data.userId).then((response) => {
                if (response.error) {
                    client.emit('room', { event: 'allIn', allIned: false, error: response.error });
                }
                else {
                    this.server.to(data.roomId).emit('room', { event: 'bet', userId: data.userId, bet: response.bet });
                }
            });
        }
        else if (data.event == "raiseToPot") {
            await this.pokerService.raiseToPot(data.roomId, data.userId, data.half).then((response) => {
                if (response.error) {
                    client.emit('room', { event: 'raiseToPot', raisedToPot: false, error: response.error });
                }
                else {
                    this.server.to(data.roomId).emit('room', { event: 'raiseToPot', userId: data.userId, bet: response.bet });
                }
            });
        }
    }
    async handleConnection(client, ...args) {
    }
    async handleDisconnect(client) {
        let roomId = Array.from(client.rooms).find(r => r != client.id);
        this.pokerService.playerDisconnected(roomId, client.id).then((response) => {
            if (response.error) {
                console.log("Error handling disconnected user: ", response.error);
            }
            else {
                this.server.to(roomId).emit('room', { event: 'disconnected', disconnected: true, userId: response.userId });
            }
        });
    }
    async afterInit(server) {
        console.log('Socket is live');
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], PokerGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('room'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], PokerGateway.prototype, "handleEvent", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], PokerGateway.prototype, "handleDisconnect", null);
PokerGateway = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)(81, { cors: { origin: '*' } }),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => poker_service_1.PokerService))),
    __metadata("design:paramtypes", [poker_service_1.PokerService])
], PokerGateway);
exports.PokerGateway = PokerGateway;
//# sourceMappingURL=poker.gateway.js.map