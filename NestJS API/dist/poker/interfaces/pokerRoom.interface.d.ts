export declare enum RoomStatus {
    OPEN = "OPEN",
    CLOSED = "CLOSED",
    PLAYING = "PLAYING",
    FINISHED = "FINISHED"
}
export declare enum GameType {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
    TOURNAMENT = "TOURNAMENT"
}
export declare class PokerRoom {
    players: any[];
    _id: string;
    name: string;
    maxPlayers: number;
    status: RoomStatus;
    type: GameType;
    password?: string;
    entryPrice?: number;
    rakeValue?: number;
    initialBet: number;
    turnBet: number | undefined;
    smallBlind: number;
    bigBlind: number;
    lastRaise: number;
    raises: number;
    currentBet: number;
    pot: number;
    round: number;
    dealerIndex: number;
    limit: boolean;
    deck?: any[];
    winners: any[];
    deckHand?: any[];
    timeout: number;
    timeoutId: any;
}
