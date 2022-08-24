import { Model } from 'mongoose';
import { StatsService } from 'src/stats/stats.service';
import { User } from 'src/users/interfaces/user.interface';
import { RouletteBet } from './interfaces/roulette.bet.interface';
export declare class RouletteService {
    private readonly statsService;
    private readonly users;
    constructor(statsService: StatsService, users: Model<User>);
    createRoulette(userId: string, rouletteBets: RouletteBet[]): Promise<any>;
}
