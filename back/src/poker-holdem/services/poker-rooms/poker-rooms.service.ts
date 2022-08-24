import { ConflictException, forwardRef, Get, Post, Inject, Injectable, NotFoundException, HttpException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CastError, Model} from 'mongoose';
import { StatsService } from 'src/stats/stats.service';
import { PokerRoomDocument } from 'src/poker-holdem/schemas/poker-room.schema';
import { User } from 'src/users/interfaces/user.interface';
import { CreateRoomDto } from '../../dto/create-room.dto';
import { PokerPlayerDocument } from 'src/poker-holdem/schemas/poker-player.schema';
import { UserDocument } from 'src/users/schemas/user.schema';
import { JoinRoomDto } from 'src/poker-holdem/dto/join-room.dto';

const Deck = require('classic-deck');

@Injectable()
export class PokerRoomsService {
    constructor(
        @InjectModel('PokerRoom') private pokerRoomsModel: Model<PokerRoomDocument>,
        @InjectModel('PokerPlayer') private pokerPlayerModel: Model<PokerPlayerDocument>,
        @InjectModel('User') private userModel: Model<UserDocument>,
        @InjectModel('User') private readonly users: Model<User>
    ) {}

	
	async createRoom(createRoomDto: CreateRoomDto) {
        try {
            createRoomDto.availableSeats = Array.from({ length: createRoomDto.maxPlayers}, (_,i) => i + 1 )
            const newRoomId = await this.pokerRoomsModel.create(createRoomDto)
            return { roomId: newRoomId._id };
        } catch(err) {
            return { error: new InternalServerErrorException(`Room could't be created, please try again.`) }
        }
	}

	
	async getRoom(roomId: string) {
        try {
            const room = await this.pokerRoomsModel.findById(roomId)
            .populate('roomState')
            .populate({
                path: 'activeRound',
                select: '-room',
                populate: {
                    path: 'players',
                    select: '-room',
                    populate: {
                        path: 'betState',
                        populate: 'betActions'
                    }
                }
            })
            return { room };
        } catch(err) { 
            if (err.kind === 'ObjectId') return { error: new BadRequestException('Wrong format id.') };
            else return { error: new InternalServerErrorException(err.message) }
        } 
    }   
    
	async listRooms() {
        try {
            const rooms = await this.pokerRoomsModel.find()
            return { rooms };
        } catch(err) {
            return { error: new InternalServerErrorException() }
        }
	}

    async deleteRoom(roomId: string) {
        const result = await this.pokerRoomsModel.findByIdAndRemove(roomId,);
        return result;
    }

    async joinRoom({ roomId, userId, roomBalance }: JoinRoomDto) {
        try {
            const room = await this.pokerRoomsModel.findById(roomId).populate('players');
            if (!room) return { error: new NotFoundException('Room was not found.') }
            const user = await this.userModel.findById(userId).populate('pokerPlayers');
            if (!user) return { error: new NotFoundException('User was not found.') }

            const isAlreadyJoined = room.players.some(p => p.user.toString() === user._id.toString())
            if ( isAlreadyJoined ) return { error: new ConflictException('Already joined.') }

            const areAnAvailableSeat = room.availableSeats.length === 0;
            if (areAnAvailableSeat) return { error: new ConflictException('The room is full') }

            const hasUserAPlayer = user.pokerPlayers.some( pp => pp.room.toString() === room._id.toString() );
            if ( hasUserAPlayer ) {
                const existingPokerPlayer = await this.pokerPlayerModel.findOne({ room: room._id, user: user._id })
                existingPokerPlayer.seat = room.availableSeats.shift()
                room.players = room.players.concat(existingPokerPlayer._id)    
                await room.save()
                await existingPokerPlayer.save()
                return { pokerPlayerId: existingPokerPlayer._id }    
            }

            const newPlayer =  await this.pokerPlayerModel.create({                                                                                                                                                             
                    user: user._id,
                    room: room._id,
                    seat: room.availableSeats.shift(),
                    roomBalance
            })

            room.players = room.players.concat(newPlayer._id)
            await room.save()
            user.pokerPlayers = user.pokerPlayers.concat(newPlayer._id)
            await user.save()

            return { pokerPlayerId: newPlayer._id }
        } catch(err) { 
            return { error: new InternalServerErrorException(err.message) }
        }
    }

    async leaveRoom(roomId: string, pokerPlayerId: string) {
        const room = await this.pokerRoomsModel.findById(roomId);
        if (!room) return { error: new NotFoundException('Room was not found.') }
        
        const player = await this.pokerPlayerModel.findById(pokerPlayerId)
        if (!player) return { error: new NotFoundException('Player was not found.') }
        
        // Return the seat to the room
        room.availableSeats.push(player.seat)
        player.seat = null
        
        room.players = room.players.filter( p => p.toString() !== pokerPlayerId )
        
        await player.save()
        await room.save()
        
        return { roomId }
    }
}
