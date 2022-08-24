import { PokerOffline } from "../interfaces/poker_offline.interface";

const compareHands = (hand1, hand2) => {
    for(let i=0; i<hand1.length; i++){
        if(hand1[i].value != hand2[i].value || hand1[i].suit != hand2[i].suit){
            return false;
        }
    }
    return true;
}

export const calculateHand = (game: PokerOffline) => {
    var Hand = require('pokersolver').Hand;
    let deckHand = game.deckHand;
    let dealerHand = game.dealerHand.concat(deckHand);
    let hand = game.currentHand.concat(deckHand);
    var hand1 = Hand.solve(hand)
    var hand2 = Hand.solve(dealerHand)
    var winner = Hand.winners([hand1, hand2])[0]['cards']
    if(compareHands(hand1['cards'], hand2['cards'])){
        return {winnerHand: winner, winner: 'tie'}
    }else if(compareHands(hand1['cards'], winner)){
        return {winnerHand: winner, winner: 'user'}
    } else {
        return {winnerHand: winner, winner: 'dealer'};
    }
}
