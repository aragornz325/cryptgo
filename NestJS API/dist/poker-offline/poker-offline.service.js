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
exports.PokerOfflineService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bet_interface_1 = require("../blackjack/interfaces/bet.interface");
const stats_service_1 = require("../stats/stats.service");
const user_interface_1 = require("../users/interfaces/user.interface");
const addBalance_function_1 = require("./functions/addBalance.function");
const poker_functions_1 = require("./functions/poker.functions");
const takeStartBet_function_1 = require("./functions/takeStartBet.function");
const Deck = require('classic-deck');
let PokerOfflineService = class PokerOfflineService {
    constructor(statsService, pokerOffline, users) {
        this.statsService = statsService;
        this.pokerOffline = pokerOffline;
        this.users = users;
    }
    async findAll() {
        return await this.pokerOffline.find();
    }
    async startGame(userId, bet) {
        return await this.pokerOffline.findOne({ userId: userId }).then(async (result) => {
            if (result == null) {
                let deck = new Deck().deck;
                deck.sort(() => Math.random() - 0.5);
                let user = await this.users.findOne({ _id: userId });
                if (user == null) {
                    return { error: 'User not found' };
                }
                console.log(bet, user.balance);
                if (user.balance < bet) {
                    return { error: 'Not enough balance to play with this bet' };
                }
                const game = new this.pokerOffline();
                const dealerHand = [deck[0], deck[1]];
                deck.splice(0, 2);
                const currenHand = [deck[0], deck[1]];
                deck.splice(0, 2);
                game.tie = false;
                game.userWon = false;
                game.dealerWon = false;
                game.userFloped = false;
                game.userId = userId;
                game.startBet = bet;
                game.bet = bet;
                game.dealerHand = dealerHand;
                game.currentHand = currenHand;
                game.deck = deck;
                (0, addBalance_function_1.default)(user, game, -1);
                await user.save();
                await game.save();
                let visibleGame = game;
                visibleGame.dealerHand = null;
                visibleGame.deck = null;
                return visibleGame;
            }
            else {
                let visibleGame = result;
                visibleGame.dealerHand = null;
                visibleGame.deck = null;
                return visibleGame;
            }
        });
    }
    async fold(userId) {
        return await this.pokerOffline.findOne({ userId: userId }).then(async (result) => {
            if (result == null) {
                return { error: 'No game found' };
            }
            else {
                let game = await this.pokerOffline.findOne({ userId });
                if (game.userFloped) {
                    return { error: 'You cant Fold' };
                }
                await game.delete();
                return { success: 'Game deleted' };
            }
        });
    }
    async flop(userId) {
        return await this.pokerOffline.findOne({ userId: userId }).then(async (result) => {
            if (result == null) {
                return { error: 'No game found' };
            }
            else {
                let game = await this.pokerOffline.findOne({ userId });
                if (game.userFloped) {
                    return { error: 'You already floped' };
                }
                let user = await this.users.findOne({ _id: userId });
                if (user.balance < game.bet * 2) {
                    return { error: 'Not enough balance to flop' };
                }
                (0, addBalance_function_1.default)(user, game, -2);
                game.bet += game.bet * 2;
                game.markModified('bet');
                game.userFloped = true;
                game.deckHand = [game.deck[0], game.deck[1], game.deck[2]];
                game.deck.splice(0, 3);
                await user.save();
                await game.save();
                let visibleGame = game;
                visibleGame.dealerHand = null;
                visibleGame.deck = null;
                return visibleGame;
            }
        });
    }
    async bet(userId) {
        return await this.pokerOffline.findOne({ userId: userId }).then(async (result) => {
            if (result == null) {
                return { error: 'No game found' };
            }
            else {
                let game = await this.pokerOffline.findOne({ userId });
                if (!game.userFloped) {
                    return { error: "You didn't floped" };
                }
                let user = await this.users.findOne({ _id: userId });
                if (user.balance < game.startBet) {
                    return { error: 'Not enough balance to bet' };
                }
                game.bet += game.startBet;
                game.markModified('bet');
                game.deckHand.push(game.deck[0]);
                game.deck.splice(0, 1);
                game.markModified('deckHand');
                game.markModified('deck');
                (0, takeStartBet_function_1.default)(user, game);
                await user.save();
                if (game.deckHand.length == 5) {
                    let results = (0, poker_functions_1.calculateHand)(game);
                    if (results.winner == 'user') {
                        game.userWon = true;
                        game.markModified('userWon');
                        (0, addBalance_function_1.default)(user, game, 2);
                        await user.save();
                    }
                    else if (results.winner == 'tie') {
                        game.tie = true;
                        (0, addBalance_function_1.default)(user, game, 1);
                        await user.save();
                    }
                    else {
                        game.dealerWon = true;
                        game.markModified('dealerWon');
                    }
                    game.deck = null;
                    const visibleGame = game;
                    game.delete();
                    return { winnerHand: results.winnerHand, game: visibleGame };
                }
                await user.save();
                await game.save();
                let visibleGame = game;
                visibleGame.dealerHand = null;
                visibleGame.deck = null;
                return visibleGame;
            }
        });
    }
    async check(userId) {
        return await this.pokerOffline.findOne({ userId: userId }).then(async (result) => {
            if (result == null) {
                return { error: 'No game found' };
            }
            else {
                let game = await this.pokerOffline.findOne({ userId });
                if (!game.userFloped) {
                    return { error: "You didn't floped" };
                }
                let user = await this.users.findOne({ _id: userId });
                if (game.deckHand.length == 3) {
                    game.deckHand.push(game.deck[0]);
                    game.deck.splice(0, 1);
                    game.markModified('deckHand');
                    game.markModified('deck');
                }
                else if (game.deckHand.length == 4) {
                    game.deckHand.push(game.deck[0]);
                    game.deck.splice(0, 1);
                    game.markModified('deckHand');
                    game.markModified('deck');
                    let results = (0, poker_functions_1.calculateHand)(game);
                    if (results.winner == 'user') {
                        game.userWon = true;
                        game.markModified('userWon');
                        (0, addBalance_function_1.default)(user, game, 2);
                        await user.save();
                    }
                    else if (results.winner == 'tie') {
                        game.tie = true;
                        (0, addBalance_function_1.default)(user, game, 1);
                        await user.save();
                    }
                    else {
                        game.dealerWon = true;
                        game.markModified('dealerWon');
                    }
                    game.deck = null;
                    const visibleGame = game;
                    game.delete();
                    return { winnerHand: results.winnerHand, game: visibleGame };
                }
                await user.save();
                await game.save();
                let visibleGame = game;
                visibleGame.dealerHand = null;
                visibleGame.deck = null;
                return visibleGame;
            }
        });
    }
};
PokerOfflineService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)('PokerOffline')),
    __param(2, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [stats_service_1.StatsService, mongoose_2.Model, mongoose_2.Model])
], PokerOfflineService);
exports.PokerOfflineService = PokerOfflineService;
//# sourceMappingURL=poker-offline.service.js.map