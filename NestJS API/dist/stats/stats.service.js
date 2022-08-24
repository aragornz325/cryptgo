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
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const coinToNumber_function_1 = require("./functions/coinToNumber.function");
let StatsService = class StatsService {
    constructor(stats) {
        this.stats = stats;
    }
    async findAll() {
        const stats = await this.stats.find();
        const earnings = await this.stats.aggregate([{
                $group: {
                    _id: { year: { $year: "$date" } },
                    earnings: { $sum: '$winning' }
                }
            }]);
        return { stats: stats.reverse(), earnings: earnings[0].earnings };
    }
    async create(userId, coins, game, description) {
        let winning = (0, coinToNumber_function_1.coinToNumber)(coins);
        return await this.stats.create({ userId, winning, game, description });
    }
    async delete(id) {
        return await this.stats.deleteOne({ _id: id });
    }
    async deleteAll() {
        return await this.stats.deleteMany({});
    }
};
StatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Stats')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StatsService);
exports.StatsService = StatsService;
//# sourceMappingURL=stats.service.js.map