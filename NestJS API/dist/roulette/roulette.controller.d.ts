import { RouletteService } from './roulette.service';
export declare class RouletteController {
    private readonly rouletteService;
    constructor(rouletteService: RouletteService);
    create(body: any): Promise<any>;
}
