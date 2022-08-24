import { PokerOffline } from './interfaces/poker_offline.interface';
import { PokerOfflineService } from './poker-offline.service';
export declare class PokerOfflineController {
    private readonly pokerOfflineService;
    constructor(pokerOfflineService: PokerOfflineService);
    findAll(): Promise<PokerOffline[]>;
    startGame(body: any): Promise<any>;
    fold(body: any): Promise<any>;
    flop(body: any): Promise<any>;
    bet(body: any): Promise<any>;
    check(body: any): Promise<any>;
}
