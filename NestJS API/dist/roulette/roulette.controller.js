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
exports.RouletteController = void 0;
const common_1 = require("@nestjs/common");
const roulette_service_1 = require("./roulette.service");
let RouletteController = class RouletteController {
    constructor(rouletteService) {
        this.rouletteService = rouletteService;
    }
    async create(body) {
        return await this.rouletteService.createRoulette(body.userId, body.rouletteBets);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RouletteController.prototype, "create", null);
RouletteController = __decorate([
    (0, common_1.Controller)('api/roulette'),
    __metadata("design:paramtypes", [roulette_service_1.RouletteService])
], RouletteController);
exports.RouletteController = RouletteController;
//# sourceMappingURL=roulette.controller.js.map