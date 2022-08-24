import { Model } from 'mongoose';
import { Bet } from 'src/blackjack/interfaces/bet.interface';
import { StatsService } from 'src/stats/stats.service';
import { User } from 'src/users/interfaces/user.interface';
import { PokerOffline } from './interfaces/poker_offline.interface';
export declare class PokerOfflineService {
    private readonly statsService;
    private readonly pokerOffline;
    private readonly users;
    constructor(statsService: StatsService, pokerOffline: Model<PokerOffline>, users: Model<User>);
    findAll(): Promise<PokerOffline[]>;
    startGame(userId: string, bet: Bet): Promise<any>;
    fold(userId: string): Promise<any>;
    flop(userId: string): Promise<any>;
    bet(userId: string): Promise<any>;
    check(userId: string): Promise<any>;
}
