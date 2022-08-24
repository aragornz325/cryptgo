import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Coins } from './interfaces/bjcoins.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

const bcrypt = require('bcryptjs');


@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly users: Model<User>) {}
    
    async findAll(): Promise<User[]> {
        return await this.users.find();
    }

    async findOne(id: string): Promise<User> {
        return await this.users.findOne({ _id: id });
    }

    async findByUsername(username: string): Promise<User> {
        return await this.users.findOne({ username });
    }

    async create(user: User): Promise<any> {
        return await this.users.findOne({username: user.username}).then( async (result) => {
            if (result) {
                return {error: "Username already exists"};
            } else {
                return await this.users.create(user);
            }
        })
    }

    async delete(id: string): Promise<User> {
        return await this.users.findByIdAndRemove(id);
    }

    async update(id: string, user: User): Promise<User> {
        return await this.users.findByIdAndUpdate(id, user, { new: true });
    }

    async updateCoins(id: string, bjCoins: Coins): Promise<User> {
        return await this.users.findByIdAndUpdate(id, { coins: bjCoins }, { new: true });
    }
    
    async deleteCoins(id: string): Promise<User> {
        return await this.users.findByIdAndUpdate(id, { coins: null }, { new: true });
    }

    async getBalances(): Promise<any> {
        const users = await this.users.find({ _id: { $ne: '622b924c7d812bd7ee763160' }});
        const balances = await users.map(user => {
            let balance = 0;
            Object.keys(user.coins).map(key => {
                switch(key){
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
            })
            return [user.username, balance];
        })
        let total = 0;
        balances.map(balance => {
            return total += Number(balance[1]);
        })
        return [['TOTAL', total], ...balances];
    }

    async addCoins(id, coins: number): Promise<any> {
        console.log('info', id, coins)
        const newUser = await this.users.findById(id);
        newUser.balance += coins;
        newUser.markModified('balance');
        console.log(newUser.balance, coins)
        await newUser.save();
        return newUser;
    }
    
}