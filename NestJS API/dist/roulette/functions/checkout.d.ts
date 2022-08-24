import { RouletteNumber } from "../classes/roulette.number.class";
import { RouletteBet } from "../interfaces/roulette.bet.interface";
export declare const checkOut: (user: any, roulleteNumber: RouletteNumber, rouletteBets: RouletteBet[]) => Promise<{
    newBets: Promise<RouletteBet>[];
    stat: {
        one: number;
        five: number;
        ten: number;
        twentyfive: number;
        fifty: number;
        hundred: number;
        twohundred: number;
        fivehundred: number;
        thousand: number;
    };
}>;
