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
exports.PokerOfflineController = void 0;
const common_1 = require("@nestjs/common");
const poker_offline_service_1 = require("./poker-offline.service");
let PokerOfflineController = class PokerOfflineController {
    constructor(pokerOfflineService) {
        this.pokerOfflineService = pokerOfflineService;
    }
    async findAll() {
        return this.pokerOfflineService.findAll();
    }
    async startGame(body) {
        return this.pokerOfflineService.startGame(body.userId, body.bet);
    }
    async fold(body) {
        return this.pokerOfflineService.fold(body.userId);
    }
    async flop(body) {
        return this.pokerOfflineService.flop(body.userId);
    }
    async bet(body) {
        return this.pokerOfflineService.bet(body.userId);
    }
    async check(body) {
        return this.pokerOfflineService.check(body.userId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PokerOfflineController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PokerOfflineController.prototype, "startGame", null);
__decorate([
    (0, common_1.Post)('fold'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PokerOfflineController.prototype, "fold", null);
__decorate([
    (0, common_1.Post)('flop'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PokerOfflineController.prototype, "flop", null);
__decorate([
    (0, common_1.Post)('bet'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PokerOfflineController.prototype, "bet", null);
__decorate([
    (0, common_1.Post)('check'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PokerOfflineController.prototype, "check", null);
PokerOfflineController = __decorate([
    (0, common_1.Controller)('api/offline'),
    __metadata("design:paramtypes", [poker_offline_service_1.PokerOfflineService])
], PokerOfflineController);
exports.PokerOfflineController = PokerOfflineController;
//# sourceMappingURL=poker-offline.controller.js.map