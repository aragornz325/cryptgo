import { Stat } from './interfaces/stats.interface';
import { Model } from 'mongoose';
export declare class StatsService {
    private readonly stats;
    constructor(stats: Model<Stat>);
    findAll(): Promise<Object>;
    create(userId: string, coins: any, game: string, description: string): Promise<Stat>;
    delete(id: string): Promise<Object>;
    deleteAll(): Promise<Object>;
}
