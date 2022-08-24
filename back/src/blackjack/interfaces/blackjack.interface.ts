import { Bet } from "./bet.interface";

export interface Blackjack {
    id?: string;
    userId: string;
    games: any[];
    bet?: Bet[];
    currentHand?: any[];
    hasPair?: any[];
    canDouble?: any[];
    userSplitted?: any[];
    dealerHand?: any[];
    deck?: any[];
    currentHandValue?: any[];
    dealerHandValue?: number;
    handStand?: any[];
    userIsBusted?: any[];
    userHasBlackjack?: any[];
    dealerHasBlackjack?: boolean;
    userWon?: any[];
    tie?: any[];
    dealerWon?: any[];
    userStand?: any[];
    dealerIsBusted?: boolean;
}