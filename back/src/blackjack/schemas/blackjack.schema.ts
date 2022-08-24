import * as mongoose from 'mongoose';

export const BlackjackShema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    bet: {
        type: Array,
        required: true
    },
    games: {
        type: Array,
        required: true
    },
    currentHand: {
        type: Array,
        required: true
    },
    hasPair: {
        type: Array,
        required: true,
    },
    userSplitted: {
        type: Array,
        required: true,
    },
    canDouble: {
        type: Array,
        required: true,
    },
    dealerHand: {
        type: Array,
        required: true
    },
    deck: {
        type: Array,
    },
    currentHandValue: {
        type: Array,
        required: true
    },
    dealerHandValue: {
        type: Number,
        required: true
    },
    userIsBusted: {
        type: Array,
        required: true,
    },
    userHasBlackjack: {
        type: Array,
        required: true,
    },
    dealerHasBlackjack: {
        type: Boolean,
        required: true,
        default: false
    },
    handStand:{
        type: Array
    },
    dealerWon:{
        type: Array,
        required: true,
    },
    tie:{
        type: Array,
        required: true,
    },
    userWon:{
        type: Array,
        required: true,
    },
    userStand:{
        type: Array,
        required: true,
    },
    dealerIsBusted: {
        type: Boolean,
        required: true,
        default: false
    }
});