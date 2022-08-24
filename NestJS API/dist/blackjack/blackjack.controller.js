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
exports.BlackjackController = void 0;
const common_1 = require("@nestjs/common");
const blackjack_service_1 = require("./blackjack.service");
let BlackjackController = class BlackjackController {
    constructor(blackjackService) {
        this.blackjackService = blackjackService;
    }
    async findAll() {
        return this.blackjackService.findAll();
    }
    async startGame(body) {
        return this.blackjackService.startGame(body.userId, body.bet, body.games);
    }
    async hit(body) {
        return this.blackjackService.hit(body.userId, body.index);
    }
    async stand(body) {
        return this.blackjackService.stand(body.userId, body.index);
    }
    async double(body) {
        return this.blackjackService.double(body.userId, body.index);
    }
    async split(body) {
        return this.blackjackService.split(body.userId, body.index);
    }
    async splitDouble(body) {
        return this.blackjackService.splitDouble(body.userId, body.index, body.handIndex);
    }
    async splitHit(body) {
        return this.blackjackService.splitHit(body.userId, body.index, body.handIndex);
    }
    async splitStand(body) {
        return this.blackjackService.splitStand(body.userId, body.index, body.handIndex);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlackjackController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlackjackController.prototype, "startGame", null);
__decorate([
    (0, common_1.Post)('hit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlackjackController.prototype, "hit", null);
__decorate([
    (0, common_1.Post)('stand'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlackjackController.prototype, "stand", null);
__decorate([
    (0, common_1.Post)('double'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlackjackController.prototype, "double", null);
__decorate([
    (0, common_1.Post)('split'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlackjackController.prototype, "split", null);
__decorate([
    (0, common_1.Post)('split/double'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlackjackController.prototype, "splitDouble", null);
__decorate([
    (0, common_1.Post)('split/hit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlackjackController.prototype, "splitHit", null);
__decorate([
    (0, common_1.Post)('split/stand'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlackjackController.prototype, "splitStand", null);
BlackjackController = __decorate([
    (0, common_1.Controller)('api/blackjack'),
    __metadata("design:paramtypes", [blackjack_service_1.BlackjackService])
], BlackjackController);
exports.BlackjackController = BlackjackController;
//# sourceMappingURL=blackjack.controller.js.map