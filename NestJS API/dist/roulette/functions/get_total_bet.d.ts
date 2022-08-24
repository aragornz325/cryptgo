import { User } from "src/users/interfaces/user.interface";
import { RouletteBet } from "../interfaces/roulette.bet.interface";
export declare const verifyBet: (rouletteBets: RouletteBet[], user: User) => {
    status: boolean;
    message: string;
    totalCoins?: undefined;
} | {
    status: boolean;
    message: string;
    totalCoins: number[];
};
