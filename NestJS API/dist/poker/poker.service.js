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
exports.PokerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bet_interface_1 = require("../blackjack/interfaces/bet.interface");
const poker_offline_schema_1 = require("../poker-offline/schemas/poker_offline.schema");
const stats_service_1 = require("../stats/stats.service");
const bet_functions_1 = require("./functions/bet.functions");
const player_interface_1 = require("./interfaces/player.interface");
const pokerRoom_interface_1 = require("./interfaces/pokerRoom.interface");
const users_service_1 = require("../users/users.service");
const user_interface_1 = require("../users/interfaces/user.interface");
const checkBets_function_1 = require("./functions/checkBets.function");
const crypto_1 = require("crypto");
const addCoins_function_1 = require("../poker-offline/functions/addCoins.function");
const poker_gateway_1 = require("./adapters/poker.gateway");
const Deck = require('classic-deck');
let PokerService = class PokerService {
    constructor(statsService, roomsModel, users, pokerGateway) {
        this.statsService = statsService;
        this.roomsModel = roomsModel;
        this.users = users;
        this.pokerGateway = pokerGateway;
    }
    async getRoom(roomId) {
        return await this.roomsModel.findById(new mongoose_2.Types.ObjectId(roomId)).exec();
    }
    async listRooms(params) {
        let conditions = {};
        if (params.type)
            conditions['type'] = params.type;
        if (params.status)
            conditions['status'] = params.status;
        return this.roomsModel.find(conditions).limit(parseInt(params.limit)).skip(parseInt(params.skip)).exec();
    }
    async countRooms(property, value) {
        return this.roomsModel.find({ property: value }).count().exec();
    }
    async createRoom(roomDto) {
        let room = new this.roomsModel(roomDto);
        room.deck = await new Deck().deck.sort(() => (0, crypto_1.randomInt)(0, 100) / 100);
        room.save();
        return room;
    }
    async deleteRoom(roomId) {
        return this.roomsModel.findById(new mongoose_2.Types.ObjectId(roomId)).then(room => {
            if (room) {
                room.players.forEach(player => {
                    this.pokerGateway.disconnectPlayer(room._id, player.id, "Room deleted");
                });
                room.remove();
                return true;
            }
            else
                return false;
        });
    }
    async deleteAllRooms() {
        return await this.roomsModel.deleteMany({}).then((result) => {
            if (result.deletedCount > 0)
                return true;
            else
                return false;
        }).catch((err) => {
            throw new Error(err);
        });
    }
    async joinRoom(roomId, playerId, userId, password) {
        return this.roomsModel.findById(new mongoose_2.Types.ObjectId(roomId)).then(async (room) => {
            if (room) {
                if (room.round != 0)
                    return { error: "Game has already started" };
                return await this.users.findById(userId).then(async (user) => {
                    if (user) {
                        if (room.password)
                            if (!password || password != room.password)
                                return { error: "Wrong password" };
                        let player = room.players.find(player => player.id == playerId || player.userId == userId);
                        if (player)
                            return { error: "Player already in room" };
                        if (user.balance >= (room.entryPrice + room.initialBet)) {
                            user.balance -= room.entryPrice;
                            let player = new player_interface_1.Player(playerId, userId);
                            player.bigBlind = true;
                            room.players.push(player);
                            await room.save();
                            this.statsService.create(userId, { one: room.entryPrice }, "Poker online", "Room entry price");
                            return true;
                        }
                        else {
                            return { error: "Not enough coins. " + room.entryPrice + room.initialBet + " coins needed. " + JSON.stringify(user.balance) + " coins available." };
                        }
                    }
                    else
                        return { error: "User not found" };
                }).catch(() => { return { error: "Couldn't join room" }; });
            }
            else
                return { error: "Room not found" };
        }).catch(() => { return { error: "Couldn't join room" }; });
    }
    async leaveRoom(roomId, playerId) {
        return await this.roomsModel.findById(new mongoose_2.Types.ObjectId(roomId)).then((room) => {
            if (room) {
                let player = room.players.find(p => p.id == playerId);
                if (player) {
                    player.connected = false;
                    return true;
                }
                else
                    return { error: "Couldn't leave room" };
            }
            else
                return { error: "Room not found" };
        }).catch((err) => { return { error: "Couldn't leave room" }; });
    }
    async playerDisconnected(roomId, playerId) {
        return await this.roomsModel.findById(new mongoose_2.Types.ObjectId(roomId)).then((room) => {
            if (room) {
                let player = room.players.find(p => p.id == playerId);
                if (player) {
                    player.connected = false;
                    return player;
                }
                else
                    return { error: "Player not found" };
            }
            else
                return { error: "Room not found:" + roomId };
        }).catch((err) => { return { error: "Error when handling disconnected player" }; });
    }
    async reconnectPlayer(roomId, id, userId) {
        return this.roomsModel.findById(new mongoose_2.Types.ObjectId(roomId)).then((room) => {
            if (room) {
                let player = room.players.find(player => player.id == id || player.userId == userId);
                if (player) {
                    player.id = id;
                    player.connected = true;
                    room.markModified('players');
                    room.save();
                    return { minBet: ((room.currentBet || (0, bet_functions_1.roundBet)(room)) + (0, bet_functions_1.roundRaiseValue)(room)) };
                }
                else
                    return { error: "Player not found" };
            }
            else
                return { error: "Room not found" };
        }).catch(() => { return { error: "Couldn't reconnect" }; });
    }
    async restartGame(roomId) {
        return this.roomsModel.findById(new mongoose_2.Types.ObjectId(roomId)).then(async (room) => {
            if (room) {
                room.round = 0;
                room.markModified("round");
                await room.save();
                return this.startGame(roomId);
            }
        });
    }
    saveRoom(room) {
        room.save((err) => {
            if (err)
                console.log(err);
        });
        return;
    }
    async startGame(roomId) {
        let room = await this.roomsModel.findById(new mongoose_2.Types.ObjectId(roomId));
        if (room) {
            if (room.round == 0) {
                room.currentBet = room.initialBet;
                room.markModified("currentBet");
                room.status = pokerRoom_interface_1.RoomStatus.PLAYING;
                room.deck = new Deck().deck.sort(() => (0, crypto_1.randomInt)(0, 100) / 100).map((c) => {
                    if (c.includes("10"))
                        return c.replace("10", "T");
                    else
                        return c;
                });
                room.players = await room.players.filter(p => p.connected = true);
                let newPlayers = [];
                await new Promise((resolve) => {
                    room.players.push(room.players.shift());
                    for (let i = 0; i < room.players.length; i++) {
                        let player = new player_interface_1.Player(room.players[i].id, room.players[i].userId, room.players[i].bigBlind);
                        if (i == 2)
                            player.bigBlind = true;
                        newPlayers.push(player);
                    }
                    resolve(undefined);
                });
                let requests = newPlayers.map(((p, index) => {
                    return new Promise(async (resolve, reject) => {
                        p.turn = false;
                        p.called = false;
                        p.folded = false;
                        p.bet = 0;
                        p.solvedHand = [];
                        p.hand = [];
                        let blind = 0;
                        let blindType = "";
                        if (index == 1) {
                            blind = room.smallBlind;
                            blindType = "small";
                        }
                        else if (index == 2) {
                            blind = room.bigBlind;
                            blindType = "big";
                        }
                        if (p.bigBlind) {
                            blind = room.bigBlind;
                            blindType = "big";
                        }
                        if (blind && blind != 0) {
                            let user = await this.users.findById(new mongoose_2.Types.ObjectId(p.userId));
                            if (!user)
                                reject({ error: "User not found" });
                            let isBetOk = (0, checkBets_function_1.checkBet)(room, false, blind, user);
                            if (isBetOk.error) {
                                this.pokerGateway.disconnectPlayer(room.id, p.id, "Error: " + isBetOk.error);
                                this.pokerGateway.sendMessage(p.id, { type: "error", error: isBetOk.error });
                            }
                            else {
                                let pot = (0, bet_functions_1.getPotForRoom)(room, false, blind);
                                if (pot == undefined)
                                    reject({ error: "Error adding bet to room" });
                                user.balance -= blind;
                                await user.save();
                                p.called = true;
                                p.checked = true;
                                p.bigBlind = false;
                                this.pokerGateway.sendMessage(room.id, { type: "bet", subtype: `${blindType} blind`, userId: p.userId, bet: blind });
                                room.markModified('lastRaise');
                                room.markModified('raises');
                                room.markModified('currentBet');
                                room.markModified('pot');
                            }
                        }
                        let tmp = room.deck.splice(room.deck.length - 2, 2);
                        p.hand = tmp;
                        this.pokerGateway.sendMessage(p.id, { type: "hand", hand: p.hand });
                        resolve(undefined);
                    });
                }));
                return await Promise.all(requests).then(async () => {
                    room.round = 1;
                    room.markModified("round");
                    room.players = newPlayers;
                    room.markModified("players");
                    let turnPlayer = undefined;
                    for (let i = 0; i < room.players.length; i++) {
                        let turn = false;
                        if (room.players.length > 3) {
                            turn = (i == 3 ? true : false);
                        }
                        else {
                            turn = (i == 0 ? true : false);
                        }
                        room.players[i].turn = turn;
                        if (turn)
                            turnPlayer = room.players[i].userId;
                    }
                    this.pokerGateway.sendMessage(room.id, { type: "turn", turn: turnPlayer });
                    await this.timeoutFold(room, turnPlayer);
                    room.markModified('round');
                    await this.saveRoom(room);
                    return { minBet: ((room.currentBet || (0, bet_functions_1.roundBet)(room)) + (0, bet_functions_1.roundRaiseValue)(room)) };
                }).catch(err => {
                    console.log(err);
                    return err;
                });
            }
            else
                return { error: "Game already started" };
        }
        else
            return { error: "Room not found" };
    }
    async afterTurn(room) {
        let connectedPlayers = room.players.filter(p => p.connected && p.folded == false).length;
        if (room.timeoutId)
            clearTimeout(room.timeoutId);
        if (room.players.filter(p => p.connected && p.folded == false && p.called == true && p.checked == true).length == connectedPlayers || connectedPlayers == 1) {
            return this.nextRound(room).then((result) => {
                if (result && result.error) {
                    return result;
                }
                if (result.event == "finished") {
                    this.pokerGateway.sendMessage(room.id, { type: "gameFinished", winners: result.winners });
                    return { ok: true };
                }
                else if (result.event == "deckHand") {
                    this.pokerGateway.sendMessage(room.id, { type: "deckHand", hand: result.deckHand });
                }
                room.players.forEach((p) => p.checked = false);
                let p = room.players.filter(p => p.turn == true).forEach(p => p.turn = false);
                let player = room.players.find(p => p.connected && p.folded == false);
                if (player) {
                    player.turn = true;
                    this.pokerGateway.sendMessage(room.id, { type: "turn", turn: player.userId });
                    this.timeoutFold(room, player.userId, false);
                }
                room.markModified('timeoutId');
                room.markModified("players");
                room.save();
                return { ok: true };
            });
        }
        else {
            let player = undefined;
            let players = room.players.filter(p => p.connected);
            for (let i = 0; i < players.length; i++) {
                if (players[i].turn) {
                    players[i].turn = false;
                    var next = players.slice(i + 1).find(p => p.folded == false);
                    if (next) {
                        next.turn = true;
                        player = next.userId;
                    }
                    else {
                        players = players.filter(p => p.folded == false);
                        players[0].turn = true;
                        player = players[0].userId;
                    }
                    break;
                }
            }
            room.markModified('players');
            await this.timeoutFold(room, player, false);
            room.save();
            this.pokerGateway.sendMessage(room.id, { type: "turn", turn: player });
            return { ok: true };
        }
    }
    async timeoutFold(room, userId, save = true) {
        room.timeoutId = new Number(setTimeout(() => {
            this.fold(room.id, userId).then((result) => {
                if (result) {
                    if (result.error) {
                        console.log(result);
                    }
                    this.pokerGateway.sendMessage(room.id, { event: 'fold', userId: userId });
                }
            });
        }, room.timeout)).valueOf();
        room.markModified('timeoutId');
        console.log(`timeout set for ${room.timeout} with id ${room.timeoutId} for player ${userId}`);
        if (save)
            await room.save();
    }
    async check(roomId, userId) {
        return await this.roomsModel.findById(new mongoose_2.Types.ObjectId(roomId)).then((room) => {
            if (room) {
                if (room.round == 0)
                    return { error: "No round in progress" };
                if (room.round == 1)
                    return { error: "Can't check before the first round" };
                let player = room.players.find(player => player.userId == userId);
                {
                    if (player) {
                        if (!player.turn)
                            return { error: "It's not your turn" };
                        player.checked = true;
                        room.markModified('players');
                        return this.afterTurn(room);
                    }
                    else
                        return { error: "Player not found" };
                }
            }
            else
                return { error: "Room not found" };
        });
    }
    async fold(roomId, userId) {
        return await this.roomsModel.findById(new mongoose_2.Types.ObjectId(roomId)).then(async (room) => {
            if (room) {
                if (room.round == 0)
                    return { error: "No round in progress" };
                let player = room.players.find(p => p.userId == userId);
                if (!player.turn)
                    return { error: "It's not your turn" };
                if (player && !player.flopped) {
                    player.folded = true;
                    room.markModified('players');
                    await room.save();
                    return this.afterTurn(room);
                }
                else
                    return false;
            }
        }).catch(() => { return { error: "Couldn't fold" }; });
        ;
    }
    async roundFinished(room) {
        room.status = pokerRoom_interface_1.RoomStatus.FINISHED;
        let prize = Math.floor(room.pot / room.winners.length);
        this.users.find({ userId: { $in: room.winners.map(p => p.userId) } }).then(async (users) => {
            users.forEach(async (user) => {
                user.balance += prize;
            });
        }).catch(() => { return { error: "Couldn't end round" }; });
        ;
        room.players.forEach((p) => {
            p.checked = false;
            p.turn = false;
            p.folded = false;
        });
        room.pot = 0;
        room.round = 0;
        room.markModified('players');
        room.markModified('pot');
        room.markModified('round');
    }
    async nextRound(room) {
        room.round += 1;
        let folded = room.players.filter(p => p.folded == true).length;
        if (folded == room.players.length - 1) {
            room.winners = [await room.players.find((p) => p.folded == false && p.connected == true)];
            this.roundFinished(room);
            return { event: 'finished', winners: room.winners.map(p => { return { userId: p.userId }; }), pot: room.pot };
        }
        if (room.round == 2) {
            room.deckHand = room.deck.splice(room.deck.length - 3, 3);
            room.markModified('deckHand');
            await room.save();
            return { event: 'deckHand', deckHand: room.deckHand };
        }
        else if (room.round == 3) {
            room.deckHand = [...room.deckHand, ...room.deck.splice(room.deck.length - 1, 1)];
            room.markModified('deckHand');
            await room.save();
            return { event: 'deckHand', deckHand: room.deckHand };
        }
        else if (room.round == 4) {
            room.deckHand = [...room.deckHand, ...room.deck.splice(room.deck.length - 1, 1)];
            room.markModified('deckHand');
            await room.save();
            return { event: 'deckHand', deckHand: room.deckHand };
        }
        else if (room.round == 5) {
            var Hand = require('pokersolver').Hand;
            let activePlayers = room.players.filter((p) => p.folded == false && p.connected == true);
            var hands = activePlayers.map((p) => {
                p.solvedHand = Hand.solve(p.hand.concat(room.deckHand));
                return p.solvedHand;
            });
            let ad = await this.afterDeal(room, hands);
            if (ad.event == 'finished') {
                room.save();
                this.roundFinished(room);
                return {
                    event: "finished",
                    winners: ad.winners.map(p => { return { id: p.userId, hand: p.solvedHand }; }),
                    pot: ad.pot
                };
            }
            let winners = Hand.winners(hands);
            if (winners.length > 1) {
                room.winners = activePlayers.filter(async (p) => {
                    return winners.findIndex(w => {
                        return p.solvedHand.cardPool.length == w.cardPool.length &&
                            p.solvedHand.cardPool.every((c, i) => {
                                c.value == w.cardPool[i].value && c.suit == w.cardPool[i].suit;
                            });
                    }) != -1;
                });
            }
            else {
                if (winners.length == 0)
                    return { error: "No winner" };
                room.winners = activePlayers.find((p) => {
                    return p.solvedHand.descr == winners[0].descr;
                });
            }
            room.markModified('winners');
            room.markModified('players');
            room.save();
            this.roundFinished(room);
            return { event: 'finished', winners: room.winners.map(p => { return { userId: p.userId, hand: p.solvedHand }; }), room: room };
        }
    }
    async afterDeal(room, hands) {
        var Hand = require('pokersolver').Hand;
        let hand = Hand.solve(room.deckHand);
        if (hand.rank == 9) {
            if (hand.descr === 'Royal Flush') {
                room.winners = room.players.filter((p) => p.connected == true && p.folded == false);
                return await this.roundFinished(room).then((response) => {
                    if (response.error)
                        return response;
                    return { event: 'finished', reason: 'Royal Flush dealed to community cards', room: room };
                });
            }
            else {
                let winner = hands.find((h) => {
                    h.descr === 'Royal Flush';
                });
                if (winner) {
                    return { event: 'continue', reason: 'There is only one winner' };
                }
                else {
                    room.winners = room.players.filter((p) => p.connected == true && p.folded == false);
                    return await this.roundFinished(room).then(() => { return { event: 'finished', reason: 'Straight Flush dealed to community cards', room: room }; });
                }
            }
        }
        else if (hand.rank == 6) {
            hands.forEach((h) => {
                if (!h.cards.every((card) => {
                    return hand.cards.some((handCard) => handCard.suit == card.suit && handCard.value == card.value);
                })) {
                    return { event: 'continue', reason: 'There is only one winner' };
                }
            });
            room.winners = room.players.filter((p) => p.connected == true && p.folded == false);
            return await this.roundFinished(room).then(() => { return { event: 'finished', reason: 'Flush dealed to community cards', room: room }; });
        }
        return { event: 'continue', reason: 'There is only one winner' };
    }
    async call(roomId, userId) {
        return await this.roomsModel.findById(new mongoose_2.Types.ObjectId(roomId)).then(async (room) => {
            if (room) {
                if (room.round == 0)
                    return { error: "No round in progress" };
                let player = await room.players.find(p => p.userId == userId);
                if (player) {
                    if (!player.turn)
                        return { error: "It's not your turn" };
                    if (player.folded)
                        return { error: 'You cannot raise if you folded' };
                    if (player.called)
                        return { error: 'You have already called' };
                    return await this.users.findById(userId).then(async (user) => {
                        let bet = (0, bet_functions_1.getBet)(room);
                        let isBetOk = await (0, checkBets_function_1.checkBet)(room, false, bet, user);
                        if (isBetOk.error)
                            return isBetOk;
                        else {
                            return await (0, bet_functions_1.getPotForRoom)(room, false).then(async (pot) => {
                                if (pot == undefined)
                                    return { error: "Error adding bet to room" };
                                room.pot = pot;
                                player.checked = true;
                                player.called = true;
                                user.balance = user.balance - bet;
                                user.markModified('coins');
                                await user.save();
                                room.markModified('lastRaise');
                                room.markModified('raises');
                                room.markModified('currentBet');
                                room.markModified('pot');
                                room.markModified('players');
                                return Object.assign(Object.assign({}, this.afterTurn(room)), { bet: bet });
                            });
                        }
                    }).catch((err) => { return { error: "Couldn't call: " + err }; });
                    ;
                }
                else
                    return { error: 'Player not found' };
            }
        }).catch((err) => { return { error: "Couldn't call" }; });
        ;
    }
    async allIn(roomId, userId) {
        return await this.roomsModel.findById(new mongoose_2.Types.ObjectId(roomId)).then(async (room) => {
            if (room) {
                if (room.round == 0)
                    return { error: "No round in progress" };
                let player = await room.players.find(p => p.userId == userId);
                if (player) {
                    let user = await this.users.findById(userId);
                    if (user) {
                        return await this.bet(roomId, userId, false, user.balance);
                    }
                    else
                        return { error: 'User not found' };
                }
                else
                    return { error: "Couldn't bet all in" };
            }
            else
                return { error: "Couldn't bet all in" };
        }).catch((err) => { return { error: "Couldn't call" }; });
        ;
    }
    async raiseToPot(roomId, userId, halfPot = false) {
        return await this.roomsModel.findById(new mongoose_2.Types.ObjectId(roomId)).then(async (room) => {
            if (room) {
                if (room.round == 0)
                    return { error: "No round in progress" };
                let player = await room.players.find(p => p.userId == userId);
                if (player) {
                    let user = await this.users.findById(userId);
                    if (user) {
                        if (room.pot && room.pot > 0) {
                            return await this.bet(roomId, userId, false, (room.pot / (halfPot ? 2 : 1)));
                        }
                    }
                    else
                        return { error: 'User not found' };
                }
                else
                    return { error: "Couldn't raise" };
            }
            else
                return { error: "Couldn't raise" };
        }).catch((err) => { return { error: "Couldn't raise" }; });
        ;
    }
    async bet(roomId, userId, raise = false, bet) {
        return this.roomsModel.findById(new mongoose_2.Types.ObjectId(roomId)).then((room) => {
            if (room) {
                if (room.round == 0)
                    return { error: "No round in progress" };
                let player = room.players.find(p => p.userId == userId);
                if (player) {
                    if (!player.turn)
                        return { error: "It's not your turn" };
                    if (player.folded)
                        return { error: 'You cannot bet if you folded' };
                    return this.users.findById(userId).then((user) => {
                        let betCheck = (bet || (0, bet_functions_1.getBet)(room, raise));
                        let isBetOk = (0, checkBets_function_1.checkBet)(room, raise, betCheck, user);
                        if (isBetOk.error)
                            return isBetOk;
                        else {
                            let res = new Promise((resolve, reject) => {
                                let betAdded = new Promise((resolve2, reject2) => (0, bet_functions_1.getPotForRoom)(room, raise, bet).then((pot) => {
                                    if (pot == undefined) {
                                        resolve2(undefined);
                                        return;
                                    }
                                    room.players.forEach(p => { let v = p.userId == userId ? true : false; p.checked = v; p.called = v; });
                                    user.balance -= betCheck;
                                    room.currentBet = betCheck;
                                    room.markModified('lastRaise');
                                    room.markModified('raises');
                                    room.markModified('currentBet');
                                    room.markModified('pot');
                                    user.save();
                                    resolve2(betCheck);
                                }));
                                betAdded.then((result) => {
                                    if (result == undefined)
                                        resolve({ error: `Error adding bet to room. New bet has to raise over the current bet(${room.currentBet || (0, bet_functions_1.roundBet)(room)}) by at least ${(0, bet_functions_1.roundRaiseValue)(room)}` });
                                    else {
                                        this.afterTurn(room).then((ret) => { resolve(Object.assign(Object.assign({}, ret), { bet: betCheck })); });
                                    }
                                });
                            });
                            return res.then((ret) => {
                                return ret;
                            });
                        }
                    }).catch((err) => { return { error: "Couldn't place bet: " + err }; });
                    ;
                }
                else
                    return { error: 'Player not found' };
            }
        }).catch((err) => { return { error: "Couldn't place bet" }; });
        ;
    }
};
PokerService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)('PokerRoom')),
    __param(2, (0, mongoose_1.InjectModel)('User')),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => poker_gateway_1.PokerGateway))),
    __metadata("design:paramtypes", [stats_service_1.StatsService, mongoose_2.Model, mongoose_2.Model, poker_gateway_1.PokerGateway])
], PokerService);
exports.PokerService = PokerService;
//# sourceMappingURL=poker.service.js.map