"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokerOfflineSchema = void 0;
const mongoose = require("mongoose");
exports.PokerOfflineSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    startBet: {},
    bet: {
        type: Number
    },
    deck: {
        type: Array,
        required: true
    },
    dealerHand: {
        type: Array,
        required: true
    },
    currentHand: {
        type: Array,
        required: true
    },
    tie: {
        type: Boolean,
        required: true,
        default: false
    },
    userWon: {
        type: Boolean,
        required: true,
        default: false
    },
    dealerWon: {
        type: Boolean,
        required: true,
        default: false
    },
    deckHand: {
        type: Array,
        required: true
    },
    userFloped: {
        type: Boolean,
        default: false
    },
});
//# sourceMappingURL=poker_offline.schema.js.map