import { User } from './interfaces/user.interface';
import { Coins } from './interfaces/bjcoins.interface';
import { Model } from 'mongoose';
export declare class UsersService {
    private readonly users;
    constructor(users: Model<User>);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByUsername(username: string): Promise<User>;
    create(user: User): Promise<any>;
    delete(id: string): Promise<User>;
    update(id: string, user: User): Promise<User>;
    updateCoins(id: string, bjCoins: Coins): Promise<User>;
    deleteCoins(id: string): Promise<User>;
    getBalances(): Promise<any>;
    addCoins(id: any, coins: number): Promise<any>;
}
