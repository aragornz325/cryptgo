export declare class BlackjackEntity {
    id?: string;
    userId: string;
    initialBet?: {};
    currentBet?: {};
    currentHand?: any[];
    dealerHand?: any[];
    currentHandValue?: number;
    deck?: any[];
    constructor(partial: Partial<BlackjackEntity>);
}
