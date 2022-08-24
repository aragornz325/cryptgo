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
exports.RouletteService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const addCoins_function_1 = require("../poker-offline/functions/addCoins.function");
const reverseCoins_function_1 = require("../poker-offline/functions/reverseCoins.function");
const stats_service_1 = require("../stats/stats.service");
const user_interface_1 = require("../users/interfaces/user.interface");
const roulette_number_class_1 = require("./classes/roulette.number.class");
const checkout_1 = require("./functions/checkout");
const get_total_bet_1 = require("./functions/get_total_bet");
let RouletteService = class RouletteService {
    constructor(statsService, users) {
        this.statsService = statsService;
        this.users = users;
    }
    async createRoulette(userId, rouletteBets) {
        let user = await this.users.findOne({ _id: userId });
        let number = Math.random() * 360;
        let slice = number / 9.72;
        let sliceNumber = Math.floor(slice);
        while (sliceNumber > 36) {
            sliceNumber = sliceNumber - 36;
        }
        let rouletteNumber = roulette_number_class_1.rouletteNumbers[sliceNumber];
        let totalBets = (0, get_total_bet_1.verifyBet)(rouletteBets, user);
        if (!totalBets.status) {
            return { status: false, message: totalBets.message };
        }
        let newTotalBets = {
            one: totalBets.totalCoins[0],
            five: totalBets.totalCoins[1],
            ten: totalBets.totalCoins[2],
            twentyfive: totalBets.totalCoins[3],
            fifty: totalBets.totalCoins[4],
            hundred: totalBets.totalCoins[5],
            twohundred: totalBets.totalCoins[6],
            fivehundred: totalBets.totalCoins[7],
            thousand: totalBets.totalCoins[8],
        };
        user.coins = (0, addCoins_function_1.addBetCoins)(user, (0, reverseCoins_function_1.reverseCoins)(newTotalBets));
        user.markModified('coins');
        await user.save();
        await this.statsService.create(user._id, (0, reverseCoins_function_1.reverseCoins)(newTotalBets), 'Roulette', 'Bets');
        const { newBets, stat } = await (0, checkout_1.checkOut)(user, rouletteNumber, rouletteBets);
        await user.save();
        if (stat) {
            await this.statsService.create(user._id, (0, reverseCoins_function_1.reverseCoins)(stat), 'Roulette', 'User Won');
        }
        let totalRotation = rouletteNumber.number * 9.72 + 360 * randomIntFromInterval(5, 13);
        return { coins: user.coins, bets: rouletteBets, newBets, status: true, rotation: totalRotation, rouletteNumber: rouletteNumber, wonCoins: (0, reverseCoins_function_1.reverseCoins)(stat) };
    }
};
RouletteService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [stats_service_1.StatsService, mongoose_2.Model])
], RouletteService);
exports.RouletteService = RouletteService;
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//# sourceMappingURL=roulette.service.js.map