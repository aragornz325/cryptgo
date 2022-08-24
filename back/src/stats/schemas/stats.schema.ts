import * as mongoose from 'mongoose';

export const StatsSchema = new mongoose.Schema({
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