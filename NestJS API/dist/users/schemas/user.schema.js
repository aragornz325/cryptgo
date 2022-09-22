"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: false
    },
    coins: {
        type: Object,
        default: {
            one: 0,
            five: 0,
            ten: 0,
            twentyfive: 0,
            fifty: 0,
            hundred: 0,
            twohundred: 0,
            fivehundred: 0,
            thousand: 0
        }
    },
    balance: {
        type: Number,
        default: 0
    }
});
//# sourceMappingURL=user.schema.js.map