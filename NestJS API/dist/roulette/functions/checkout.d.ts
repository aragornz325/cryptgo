import { RouletteNumber } from "../classes/roulette.number.class";
import { RouletteBet } from "../interfaces/roulette.bet.interface";
export declare const checkOut: (user: any, roulleteNumber: RouletteNumber, rouletteBets: RouletteBet[]) => Promise<{
    newBets: RouletteBet[];
    wonAmount: number;
}>;
