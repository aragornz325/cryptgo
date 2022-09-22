import { Model } from 'mongoose';
import { Blackjack } from './interfaces/blackjack.interface';
import { User } from '../users/interfaces/user.interface';
import { StatsService } from 'src/stats/stats.service';
export declare class BlackjackService {
    private readonly statsService;
    private readonly blackjack;
    private readonly users;
    constructor(statsService: StatsService, blackjack: Model<Blackjack>, users: Model<User>);
    findAll(): Promise<Blackjack[]>;
    startGame(userId: string, bet: Array<number>, games: []): Promise<any>;
    stand(userId: string, index: number): Promise<any>;
    hit(userId: string, index: number): Promise<any>;
    double(userId: string, index: number): Promise<any>;
    split(userId: string, index: number): Promise<any>;
    splitStand(userId: string, index: number, handIndex: number): Promise<any>;
    splitHit(userId: string, index: number, handIndex: number): Promise<any>;
    splitDouble(userId: string, index: number, handIndex: number): Promise<any>;
    finish(userId: string): Promise<(import("mongoose").Document<any, any, Blackjack> & Blackjack & {
        _id: import("mongoose").Types.ObjectId;
    }) | {
        error: string;
    }>;
}
