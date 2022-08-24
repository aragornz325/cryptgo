"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsSchema = void 0;
const mongoose = require("mongoose");
exports.StatsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    winning: {
        type: Number,
        required: true
    },
    game: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: 'No description'
    },
    date: {
        type: Date,
        default: Date.now
    }
});
//# sourceMappingURL=stats.schema.js.map