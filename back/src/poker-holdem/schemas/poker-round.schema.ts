import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { PokerPlayer } from './poker-player.schema';
import { RoundState } from './round-state.schema';
import { PokerRoom } from './poker-room.schema';

export type PokerRoundDocument = PokerRound & Document;

@Schema()
export class PokerRound {
    @Prop()
    deck: []

    @Prop({ default: 0 })
    pot: number
    
    @Prop({ default: 0 })
    currentBet: number
    
    @Prop({ type: mongoose.Schema.Types.Number, ref: 'RoundState' })
    roundState: number

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'PokerPlayer' })
    players: PokerPlayer[]
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PokerPlayer' })
    dealer: PokerPlayer
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PokerPlayer' })
    activePlayer: PokerPlayer

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PokerRoom' })
    room: PokerRoom

}

export const PokerRoundSchema = SchemaFactory.createForClass(PokerRound)