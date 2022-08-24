export declare class Player {
    id: string;
    userId: string;
    nickname?: string;
    bet?: number;
    hand?: any[];
    called: boolean;
    folded?: boolean;
    checked?: boolean;
    connected: boolean;
    solvedHand: any;
    turn: boolean;
    bigBlind: boolean;
    constructor(id: string, userId: string, bigBlind?: boolean);
}
