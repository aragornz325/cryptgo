import { GameType } from "../interfaces/pokerRoom.interface";
export declare class CreateRoomDto {
    round: number;
    maxPlayers: number;
    type: GameType;
    entryPrice?: number;
    rakeValue?: number;
    password?: string;
    dealerIndex: number;
    turnBet?: number;
    initialBet: number;
    limit: boolean;
    name: string;
    smallBlind: number;
    bigBlind: number;
    winners: any[];
    pot: number;
    timeout: number;
    constructor(name: string, maxPlayers: number, type: GameType, limit: boolean, initialBet?: number, turnBet?: number, entryPrice?: number, rakeValue?: number, password?: string, timeout?: number);
}
