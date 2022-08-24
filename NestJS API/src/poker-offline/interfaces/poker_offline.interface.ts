export interface PokerOffline {
    id?: string;
    userId: string;
    startBet?: number;
    bet?: number;
    dealerHand?: any[];
    currentHand?: any[];
    deck?: any[];
    tie?: boolean;
    dealerWon?: boolean;
    userWon?: boolean;
    deckHand?: any[];
    userFloped?: boolean;
}