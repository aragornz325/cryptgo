import { Stat } from './interfaces/stats.interface';
import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    findAll(): Promise<Object>;
    create(body: any): Promise<Stat>;
    delete(id: string): Promise<Object>;
    deleteAll(): Promise<Object>;
}
