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
exports.BlackjackService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const _52_deck_1 = require("52-deck");
const hand_value_function_1 = require("./functions/hand-value.function");
const stats_service_1 = require("../stats/stats.service");
const addBalance_function_1 = require("./functions/addBalance.function");
let BlackjackService = class BlackjackService {
    constructor(statsService, blackjack, users) {
        this.statsService = statsService;
        this.blackjack = blackjack;
        this.users = users;
    }
    async findAll() {
        return await this.blackjack.find();
    }
    async startGame(userId, bet, games) {
        return await this.blackjack
            .findOne({ userId })
            .then(async (result) => {
            if (result === null) {
                let deck = (0, _52_deck_1.shuffle)((0, _52_deck_1.newDecks)(1));
                let user = await this.users.findOne({ _id: userId });
                if (user.balance < bet[0] + bet[1] + bet[2]) {
                    return { error: 'Balance is lower than bets' };
                }
                games.map((g, i) => {
                    if (g && bet[i] <= 0) {
                        return { error: `Game ${i + 1} is started but bet is not received` };
                    }
                });
                deck = (0, _52_deck_1.shuffle)(deck);
                let game = await this.blackjack.create({
                    userId,
                    games,
                    bet,
                    dealerHandValue: (0, hand_value_function_1.getHandValue)([deck[0], deck[1]]),
                    dealerHand: [deck[0], deck[1]],
                    deck: deck.slice(2, deck.length - 1),
                });
                const lastIndex = game.games[2] ? 2 : game.games[1] ? 1 : game.games[0] ? 0 : -1;
                for (let i = 0; i < 3; i++) {
                    game.userStand[i] = !game.games[i];
                    if (games[i]) {
                        (0, addBalance_function_1.default)(user, game, i, -1);
                        const currentHand = [game.deck[0], game.deck[1]];
                        game.deck = game.deck.slice(2);
                        if (currentHand[0].value == currentHand[1].value) {
                            game.hasPair[i] = true;
                        }
                        if (currentHand[0].value + currentHand[1].value <= 11) {
                            game.canDouble[i] = true;
                        }
                        let handValue = (0, hand_value_function_1.getHandValue)(currentHand);
                        game.currentHand[i] = currentHand;
                        game.currentHandValue[i] = handValue;
                        if (game.dealerHandValue == 21) {
                            game.dealerHasBlackjack = true;
                        }
                        if (handValue == 21) {
                            game.userHasBlackjack[i] = true;
                            game.userStand[i] = true;
                            if (lastIndex === i) {
                                return this.finish(game.userId);
                            }
                        }
                        if (game.userHasBlackjack[i] && game.dealerHasBlackjack) {
                            game.tie[i] = true;
                        }
                        else if (game.userHasBlackjack[i]) {
                            game.userWon[i] = true;
                        }
                        else if (game.dealerHasBlackjack) {
                            game.dealerWon[i] = true;
                        }
                    }
                }
                await user.save();
                await game.save();
                let visibleNewBlackjack = game;
                visibleNewBlackjack.deck = null;
                visibleNewBlackjack.dealerHand[1] = null;
                visibleNewBlackjack.dealerHandValue = (0, hand_value_function_1.getHandValue)([
                    visibleNewBlackjack.dealerHand[0],
                ]);
                return visibleNewBlackjack;
            }
            else {
                let visibleResult = result;
                visibleResult.deck = null;
                visibleResult.dealerHand[1] = null;
                visibleResult.dealerHandValue = (0, hand_value_function_1.getHandValue)([
                    visibleResult.dealerHand[0],
                ]);
                return result;
            }
        });
    }
    async stand(userId, index) {
        return await this.blackjack.findOne({ userId }).then(async (result) => {
            if (result === null) {
                return { error: "This game does not exist" };
            }
            else {
                const game = await this.blackjack.findOne({ userId });
                if (game.userIsBusted[index]) {
                    return { error: 'This hand is busted' };
                }
                if (game.userStand[index]) {
                    return { error: 'This hand is already standing' };
                }
                game.hasPair[index] = false;
                game.userStand[index] = true;
                if (!game.userStand.includes(false)) {
                    await game.save();
                    return this.finish(userId);
                }
                else {
                    await game.save();
                    return game;
                }
            }
        });
    }
    async hit(userId, index) {
        return await this.blackjack.findOne({ userId }).then(async (result) => {
            if (result === null) {
                return { error: "This user doesn't have a game yet" };
            }
            else {
                const game = await this.blackjack.findOne({ userId });
                if (game.userIsBusted[index]) {
                    return { error: 'This hand is busted' };
                }
                if (game.userStand[index]) {
                    return { error: 'This hand is already standing' };
                }
                game.canDouble[index] = false;
                game.markModified('canDouble');
                game.hasPair[index] = false;
                game.currentHand[index] = [...game.currentHand[index], game.deck[0]];
                game.deck = game.deck.slice(1);
                game.currentHandValue[index] = (0, hand_value_function_1.getHandValue)(game.currentHand[index]);
                if (game.currentHandValue[index] > 21) {
                    game.userStand[index] = true;
                    game.userIsBusted[index] = true;
                    game.dealerWon[index] = true;
                    if (!game.userStand.includes(false)) {
                        await game.save();
                        return this.finish(userId);
                    }
                }
                else if (game.currentHandValue[index] === 21) {
                    game.userHasBlackjack[index] = true;
                    game.handStand[index] = true;
                    if (!game.userStand.includes(false)) {
                        await game.save();
                        return this.finish(userId);
                    }
                }
                await game.save();
                let visibleResult = game;
                visibleResult.deck = null;
                visibleResult.dealerHand[1] = null;
                visibleResult.dealerHandValue = (0, hand_value_function_1.getHandValue)([
                    visibleResult.dealerHand[0],
                ]);
                return visibleResult;
            }
        });
    }
    async double(userId, index) {
        return await this.blackjack.findOne({ userId }).then(async (result) => {
            if (result == null) {
                return { error: "This user doesn't have a game yet" };
            }
            else {
                const user = await this.users.findById(userId);
                let game = await this.blackjack.findOne({ userId });
                if (game.canDouble[index] == true) {
                    game.hasPair[index] = false;
                    game.userStand[index] = true;
                    let allStand = true;
                    const deck = game.deck;
                    let currentHand = game.currentHand[index];
                    currentHand.push(deck[0]);
                    game.currentHand[index] = currentHand;
                    deck.splice(0, 1);
                    game.currentHandValue[index] = (0, hand_value_function_1.getHandValue)(game.currentHand[index]);
                    if (game.currentHandValue[index] > 21) {
                        game.userIsBusted[index] = true;
                    }
                    else if (game.currentHandValue[index] == 21) {
                        game.userHasBlackjack[index] = true;
                    }
                    game.deck = deck;
                    (0, addBalance_function_1.default)(user, game, index, -1);
                    await user.save();
                    game.bet[index] *= 2;
                    game.markModified('bet');
                    await game.save();
                    for (let i = 0; i < 3; i++) {
                        if (game.games[i] && !game.userStand[i]) {
                            allStand = false;
                        }
                    }
                    if (allStand) {
                        await game.save();
                        return this.finish(userId);
                    }
                    let visibleResult = game;
                    visibleResult.dealerHand[1] = null;
                    visibleResult.dealerHandValue = (0, hand_value_function_1.getHandValue)([
                        visibleResult.dealerHand[0],
                    ]);
                    visibleResult.deck = null;
                    return visibleResult;
                }
                else {
                    return { error: "You can't double this hand" };
                }
            }
        });
    }
    async split(userId, index) {
        return await this.blackjack.findOne({ userId }).then(async (result) => {
            if (result == null) {
                return { error: "This user doesn't have a game yet" };
            }
            else {
                const game = await this.blackjack.findOne({ userId });
                if (game.hasPair[index]) {
                    const user = await this.users.findOne({ _id: userId });
                    game.hasPair[index] = false;
                    (0, addBalance_function_1.default)(user, game, index, -1);
                    game.bet[index] *= 2;
                    game.markModified('bet');
                    game.userSplitted[index] = true;
                    game.userIsBusted[index] = [false, false];
                    game.userWon[index] = [false, false];
                    game.canDouble[index] = [false, false];
                    game.handStand[index] = [false, false];
                    game.dealerWon[index] = [false, false];
                    game.userHasBlackjack[index] = [false, false];
                    game.handStand[index] = [false, false];
                    game.tie[index] = [false, false];
                    game.currentHandValue[index] = [0, 0];
                    game.currentHand[index] = [
                        [game.currentHand[index][0], game.deck[0]],
                        [game.currentHand[index][1], game.deck[1]],
                    ];
                    game.deck.splice(0, 2);
                    for (let i = 0; i < game.currentHand[index].length; i++) {
                        if (game.currentHand[index][i][0].value +
                            game.currentHand[index][i][1].value <=
                            11) {
                            game.canDouble[index][i] = true;
                            game.markModified('canDouble');
                        }
                        game.currentHandValue[index][i] = (0, hand_value_function_1.getHandValue)(game.currentHand[index][i]);
                        game.markModified('currentHandValue');
                        if (game.currentHandValue[index][i] == 21) {
                            game.userHasBlackjack[index][i] = true;
                            game.markModified('userHasBlackjack');
                            game.handStand[index][i] = true;
                            game.markModified('handStand');
                        }
                        if (game.handStand[index].indexOf(false) === -1) {
                            game.userStand[index] = true;
                            game.markModified('userStand');
                        }
                    }
                    await user.save();
                    await game.save();
                    let visibleNewBlackjack = game;
                    visibleNewBlackjack.dealerHand[1] = null;
                    visibleNewBlackjack.dealerHandValue = (0, hand_value_function_1.getHandValue)([
                        visibleNewBlackjack.dealerHand[0],
                    ]);
                    visibleNewBlackjack.deck = null;
                    return visibleNewBlackjack;
                }
                else {
                    return { error: "You can't split a hand that doesn't have a pair" };
                }
            }
        });
    }
    async splitStand(userId, index, handIndex) {
        return await this.blackjack.findOne({ userId }).then(async (result) => {
            if (result == null) {
                return { error: "This user doesn't have a game yet" };
            }
            else {
                const game = await this.blackjack.findOne({ userId });
                if (game.userIsBusted[index][handIndex]) {
                    return { error: 'This hand is busted' };
                }
                if (game.handStand[index][handIndex]) {
                    return { error: 'This hand is already standing' };
                }
                game.handStand[index][handIndex] = true;
                if (game.handStand[index].indexOf(false) === -1) {
                    game.userStand[index] = true;
                    game.markModified('userStand');
                }
                let allStand = false;
                if (game.userStand.indexOf(false) < 0) {
                    allStand = true;
                }
                game.markModified('handStand');
                await game.save();
                if (allStand) {
                    await game.save();
                    return this.finish(userId);
                }
                return game;
            }
        });
    }
    async splitHit(userId, index, handIndex) {
        return await this.blackjack.findOne({ userId }).then(async (result) => {
            if (result == null) {
                return { error: "This user doesn't have a game yet" };
            }
            else {
                const game = await this.blackjack.findOne({ userId });
                if (game.handStand[index][handIndex]) {
                    return { error: 'This hand is already standing' };
                }
                if (game.userIsBusted[index][handIndex]) {
                    return { error: 'This hand is busted' };
                }
                const deck = game.deck;
                game.canDouble[index][handIndex] = false;
                game.markModified('canDouble');
                let currentHand = game.currentHand[index][handIndex];
                currentHand.push(deck[0]);
                game.currentHand[index][handIndex] = currentHand;
                game.markModified('currentHand');
                deck.splice(0, 1);
                const handValue = (0, hand_value_function_1.getHandValue)(currentHand);
                await game.save();
                game.currentHandValue[index][handIndex] = handValue;
                game.markModified('currentHandValue');
                if (handValue > 21) {
                    let allStand = true;
                    game.handStand[index][handIndex] = true;
                    game.markModified('handStand');
                    game.userIsBusted[index][handIndex] = true;
                    game.markModified('userIsBusted');
                    game.dealerWon[index][handIndex] = true;
                    game.markModified('dealerWon');
                    game.deck = deck;
                    game.markModified('deck');
                    await game.save();
                    if (game.handStand[index][0] && game.handStand[index][1]) {
                        game.userStand[index] = true;
                        game.markModified('userStand');
                        await game.save();
                    }
                    for (let i = 0; i < 3; i++) {
                        if (game.games[i] && !game.userStand[i]) {
                            allStand = false;
                        }
                    }
                    if (allStand) {
                        await game.save();
                        return this.finish(userId);
                    }
                    let visibleResult = game;
                    visibleResult.deck = null;
                    return visibleResult;
                }
                else if (handValue == 21) {
                    game.userHasBlackjack[index][handIndex] = true;
                    game.markModified('userHasBlackjack');
                    game.handStand[index][handIndex] = true;
                    game.markModified('handStand');
                    game.deck = deck;
                    await game.save();
                    if (game.handStand[index][0] && game.handStand[index][1]) {
                        game.userStand[index] = true;
                    }
                    let allStand = true;
                    if (game.userStand.indexOf(true)) {
                        allStand = false;
                    }
                    if (allStand) {
                        await game.save();
                        return this.finish(userId);
                    }
                    let visibleResult = game;
                    visibleResult.dealerHand[1] = null;
                    visibleResult.dealerHandValue = (0, hand_value_function_1.getHandValue)([
                        visibleResult.dealerHand[0],
                    ]);
                    visibleResult.deck = null;
                    return visibleResult;
                }
                else {
                    game.deck = deck;
                    await game.save();
                    let visibleResult = game;
                    visibleResult.deck = null;
                    visibleResult.dealerHand[1] = null;
                    visibleResult.dealerHandValue = (0, hand_value_function_1.getHandValue)([
                        visibleResult.dealerHand[0],
                    ]);
                    return visibleResult;
                }
            }
        });
    }
    async splitDouble(userId, index, handIndex) {
        return await this.blackjack.findOne({ userId }).then(async (result) => {
            if (result == null) {
                return { error: "This user doesn't have a game yet" };
            }
            else {
                let game = await this.blackjack.findOne({ userId });
                if (!game.canDouble[index][handIndex]) {
                    return { error: "You can't double this hand" };
                }
                else {
                    if (game.handStand[index][handIndex]) {
                        return {
                            error: "You can't double a hand that is already standing",
                        };
                    }
                    else {
                        const user = await this.users.findById(userId);
                        (0, addBalance_function_1.default)(user, game, index, -1);
                        await user.save();
                        game.handStand[index][handIndex] = true;
                        game.markModified('handStand');
                        const deck = game.deck;
                        let currentHand = game.currentHand[index][handIndex];
                        currentHand.push(deck[0]);
                        game.currentHand[index][handIndex] = currentHand;
                        game.markModified('currentHand');
                        deck.splice(0, 1);
                        game.currentHandValue[index][handIndex] = (0, hand_value_function_1.getHandValue)(game.currentHand[index][handIndex]);
                        game.markModified('currentHandValue');
                        if (game.currentHandValue[index][handIndex] > 21) {
                            game.userIsBusted[index][handIndex] = true;
                            game.markModified('userIsBusted');
                        }
                        else if (game.currentHandValue[index][handIndex] == 21) {
                            game.userHasBlackjack[index][handIndex] = true;
                            game.markModified('userHasBlackjack');
                        }
                        game.deck = deck;
                        let allStand = true;
                        if (game.handStand[index].indexOf(false) === -1) {
                            game.userStand[index] = true;
                        }
                        game.markModified('userStand');
                        for (let i = 0; i < 3; i++) {
                            if (game.games[i] && !game.userStand[i]) {
                                allStand = false;
                            }
                        }
                        await game.save();
                        if (allStand) {
                            await game.save();
                            return this.finish(userId);
                        }
                        let visibleResult = game;
                        visibleResult.dealerHand[1] = null;
                        visibleResult.dealerHandValue = (0, hand_value_function_1.getHandValue)([
                            visibleResult.dealerHand[0],
                        ]);
                        visibleResult.deck = null;
                        return visibleResult;
                    }
                }
            }
        });
    }
    async finish(userId) {
        return await this.blackjack.findOne({ userId }).then(async (result) => {
            if (result == null) {
                return { error: "This user doesn't have a game yet" };
            }
            else {
                const game = await this.blackjack.findOne({ userId });
                const user = await this.users.findById(userId);
                let deck = game.deck;
                let maxValue = 0;
                for (let i = 0; i < 3; i++) {
                    if (game.games[i]) {
                        if (game.userSplitted[i]) {
                            for (let j = 0; j < 3; j++) {
                                if (game.currentHandValue[i][j] > maxValue) {
                                    maxValue = game.currentHandValue[i][j];
                                }
                            }
                        }
                        else {
                            if (!game.userIsBusted[i] &&
                                game.currentHandValue[i] > maxValue) {
                                maxValue = game.currentHandValue[i];
                            }
                        }
                    }
                }
                while (game.dealerHandValue < 17 || maxValue > game.dealerHandValue) {
                    game.dealerHand.push(deck[0]);
                    deck.splice(0, 1);
                    game.dealerHandValue = (0, hand_value_function_1.getHandValue)(game.dealerHand);
                }
                if (game.dealerHandValue > 21) {
                    game.dealerIsBusted = true;
                    for (let i = 0; i < 3; i++) {
                        if (game.games[i]) {
                            if (game.userSplitted[i]) {
                                for (let j = 0; j < 2; j++) {
                                    if (!game.userIsBusted[i][j]) {
                                        if (game.userHasBlackjack[i][j]) {
                                            game.dealerWon[i][j] = false;
                                            game.markModified('dealerWon');
                                            game.userWon[i][j] = true;
                                            game.markModified('userWon');
                                            (0, addBalance_function_1.default)(user, game, i, 1.25);
                                            await user.save();
                                        }
                                        else {
                                            game.dealerWon[i][j] = false;
                                            game.markModified('dealerWon');
                                            game.userWon[i][j] = true;
                                            game.markModified('userWon');
                                            (0, addBalance_function_1.default)(user, game, i, 1);
                                            await user.save();
                                        }
                                    }
                                    else {
                                        game.dealerWon[i][j] = true;
                                        game.markModified('dealerWon');
                                        game.userWon[i][j] = false;
                                        game.markModified('userWon');
                                        await game.save();
                                    }
                                }
                            }
                            else {
                                if (!game.userIsBusted[i]) {
                                    if (game.userHasBlackjack[i]) {
                                        game.dealerWon[i] = true;
                                        game.userWon[i] = true;
                                        (0, addBalance_function_1.default)(user, game, i, 2.5);
                                        await user.save();
                                    }
                                    else {
                                        game.dealerWon[i] = false;
                                        game.userWon[i] = true;
                                        (0, addBalance_function_1.default)(user, game, i, 2);
                                        await user.save();
                                    }
                                }
                                else {
                                    game.dealerWon[i] = true;
                                    game.userWon[i] = false;
                                    await user.save();
                                }
                            }
                        }
                    }
                }
                else if (game.dealerHandValue == 21) {
                    game.dealerHasBlackjack = true;
                    for (let i = 0; i < 3; i++) {
                        if (game.games[i]) {
                            if (game.userSplitted[i]) {
                                for (let j = 0; j < 2; j++) {
                                    if (game.userHasBlackjack[i][j]) {
                                        game.tie[i][j] = [true];
                                        user.markModified('tie');
                                        (0, addBalance_function_1.default)(user, game, i, 0.5);
                                        await user.save();
                                    }
                                    else {
                                        game.dealerWon[i][j] = true;
                                        user.markModified('dealerWon');
                                        await user.save();
                                    }
                                }
                            }
                            else {
                                if (game.userHasBlackjack[i]) {
                                    game.tie[i] = true;
                                    (0, addBalance_function_1.default)(user, game, i, 1);
                                    await user.save();
                                }
                                else if (!game.userHasBlackjack[i]) {
                                    game.userIsBusted[i] = true;
                                    game.dealerWon[i] = true;
                                    await user.save();
                                }
                            }
                        }
                    }
                }
                else {
                    for (let i = 0; i < 3; i++) {
                        if (game.games[i]) {
                            if (game.userSplitted[i]) {
                                for (let j = 0; j < 2; j++) {
                                    if (game.currentHandValue[i][j] > game.dealerHandValue &&
                                        !game.userIsBusted[i][j]) {
                                        if (game.userHasBlackjack[i][j]) {
                                            game.userWon[i][j] = true;
                                            user.markModified('userWon');
                                            (0, addBalance_function_1.default)(user, game, i, 1.25);
                                            await user.save();
                                        }
                                        else {
                                            game.userWon[i][j] = true;
                                            user.markModified('userWon');
                                            (0, addBalance_function_1.default)(user, game, i, 1);
                                            await user.save();
                                        }
                                    }
                                    else if (game.currentHandValue[i][j] == game.dealerHandValue) {
                                        game.tie[i][j] = true;
                                        user.markModified('tie');
                                        (0, addBalance_function_1.default)(user, game, i, 0.5);
                                        await user.save();
                                    }
                                    else {
                                        game.dealerWon[i][j] = true;
                                        user.markModified('dealerWon');
                                        await user.save();
                                    }
                                }
                            }
                            else {
                                if (game.currentHandValue[i] > game.dealerHandValue &&
                                    !game.userIsBusted[i]) {
                                    if (game.userHasBlackjack[i]) {
                                        game.userWon[i] = true;
                                        user.markModified('userWon');
                                        (0, addBalance_function_1.default)(user, game, i, 2.5);
                                        await user.save();
                                    }
                                    else {
                                        game.userWon[i] = true;
                                        (0, addBalance_function_1.default)(user, game, i, 2);
                                        await user.save();
                                    }
                                }
                                else if (game.currentHandValue[i] == game.dealerHandValue) {
                                    game.tie[i] = true;
                                    (0, addBalance_function_1.default)(user, game, i, 1);
                                    await user.save();
                                }
                                else if (game.currentHandValue[i] < game.dealerHandValue) {
                                    game.dealerWon[i] = true;
                                }
                            }
                        }
                    }
                }
                let visibleResult = game;
                game.markModified('tie');
                await game.delete();
                visibleResult.deck = null;
                return visibleResult;
            }
        });
    }
};
BlackjackService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_2.InjectModel)('Blackjack')),
    __param(2, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [stats_service_1.StatsService,
        mongoose_1.Model,
        mongoose_1.Model])
], BlackjackService);
exports.BlackjackService = BlackjackService;
//# sourceMappingURL=blackjack.service.js.map