import { Stat } from './interfaces/stats.interface';
import { Model } from 'mongoose';
import { Bet } from './interfaces/bet.interface';
export declare class StatsService {
    private readonly stats;
    constructor(stats: Model<Stat>);
    findAll(): Promise<Object>;
    create(userId: string, coins: Bet, game: string, description: string): Promise<Stat>;
    delete(id: string): Promise<Object>;
    deleteAll(): Promise<Object>;
}
