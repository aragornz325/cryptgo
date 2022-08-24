import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, model } from "mongoose";
import { PokerPlayer, PokerPlayerDocument, PokerPlayerSchema } from "src/poker-holdem/schemas/poker-player.schema";
import { PokerRoomDocument } from "src/poker-holdem/schemas/poker-room.schema";
import { PokerRoundDocument } from "src/poker-holdem/schemas/poker-round.schema";

@Injectable()
export class PokerGameService {
    constructor(
        @InjectModel('PokerRoom') private pokerRoomModel: Model<PokerRoomDocument>,
        @InjectModel('PokerRound') private pokerRoundModel: Model<PokerRoundDocument>,
        @InjectModel('PokerPlayer') private pokerPlayerModel: Model<PokerPlayerDocument>
    ) {}
	
    async startGame(roomId:string) {
        try {
            const room = await this.pokerRoomModel.findById(roomId).populate<{ players: PokerPlayerDocument[] }>('players')
            if (!room) return { error: new NotFoundException('Room was not found') }
            
            if (room.activeRound) return {
                error: new ConflictException('Room already has an active round.',) 
            }

            if (room.players.length < 2) return { 
                error: new ConflictException('Room cannot start because there are not sufficient players.') 
            }

            room.players.sort( (a,b) => a.seat > b.seat ? 1 : -1 )
            
            const newRound = await this.pokerRoundModel.create({ 
                room: room._id,
                players: room.players,
                dealer: room.players[0]._id,
                activePlayer: room.players[1]._id,
                roundState: 1
            })

            // SMALL-BLIND
            await this.pokerPlayerModel.findOneAndUpdate({ _id: room.players[1]._id },{ betState: 1 })
            // BIG-BLIND
            if (room.players[2]) await this.pokerPlayerModel.findOneAndUpdate({ _id: room.players[0]._id },{ betState: 2 });
            else await this.pokerPlayerModel.findOneAndUpdate({ _id: room.players[0]._id },{ betState: 2 })
            
            room.activeRound = newRound._id;
            room.rounds = room.rounds.concat(newRound._id)
            room.roomState = 2
            await room.save();
            
            return { newRound };
        } catch (err) { return { error: new InternalServerErrorException(err.message) } }
	}
}

