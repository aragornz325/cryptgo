import { BlackjackService } from './blackjack.service';
import { Blackjack } from './interfaces/blackjack.interface';
export declare class BlackjackController {
    private readonly blackjackService;
    constructor(blackjackService: BlackjackService);
    findAll(): Promise<Blackjack[]>;
    startGame(body: any): Promise<any>;
    hit(body: any): Promise<any>;
    stand(body: any): Promise<any>;
    double(body: any): Promise<any>;
    split(body: any): Promise<any>;
    splitDouble(body: any): Promise<any>;
    splitHit(body: any): Promise<any>;
    splitStand(body: any): Promise<any>;
}
