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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require('bcryptjs');
let UsersService = class UsersService {
    constructor(users) {
        this.users = users;
    }
    async findAll() {
        return await this.users.find();
    }
    async findOne(id) {
        return await this.users.findOne({ _id: id });
    }
    async findByUsername(username) {
        return await this.users.findOne({ username });
    }
    async create(user) {
        return await this.users.findOne({ username: user.username }).then(async (result) => {
            if (result) {
                return { error: "Username already exists" };
            }
            else {
                return await this.users.create(user);
            }
        });
    }
    async delete(id) {
        return await this.users.findByIdAndRemove(id);
    }
    async update(id, user) {
        return await this.users.findByIdAndUpdate(id, user, { new: true });
    }
    async updateCoins(id, bjCoins) {
        return await this.users.findByIdAndUpdate(id, { coins: bjCoins }, { new: true });
    }
    async deleteCoins(id) {
        return await this.users.findByIdAndUpdate(id, { coins: null }, { new: true });
    }
    async getBalances() {
        const users = await this.users.find({ _id: { $ne: '622b924c7d812bd7ee763160' } });
        const balances = await users.map(user => {
            let balance = 0;
            Object.keys(user.coins).map(key => {
                switch (key) {
                    case 'one':
                        balance += user.coins[key] * 1;
                        break;
                    case 'five':
                        balance += user.coins[key] * 5;
                        break;
                    case 'ten':
                        balance += user.coins[key] * 10;
                        break;
                    case 'twentyfive':
                        balance += user.coins[key] * 25;
                        break;
                    case 'fifty':
                        balance += user.coins[key] * 50;
                        break;
                    case 'hundred':
                        balance += user.coins[key] * 100;
                        break;
                    case 'twohundred':
                        balance += user.coins[key] * 200;
                        break;
                    case 'fivehundred':
                        balance += user.coins[key] * 500;
                        break;
                    case 'thousand':
                        balance += user.coins[key] * 1000;
                        break;
                }
                return;
            });
            return [user.username, balance];
        });
        let total = 0;
        balances.map(balance => {
            return total += Number(balance[1]);
        });
        return [['TOTAL', total], ...balances];
    }
    async addCoins(id, coins) {
        console.log('info', id, coins);
        const newUser = await this.users.findById(id);
        newUser.balance += coins;
        newUser.markModified('balance');
        console.log(newUser.balance, coins);
        await newUser.save();
        return newUser;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map