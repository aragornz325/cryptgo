import { Model } from 'mongoose';
import { StatsService } from 'src/stats/stats.service';
import { PokerRoom } from './interfaces/pokerRoom.interface';
import { User } from 'src/users/interfaces/user.interface';
import { PokerRoomDocument } from './schemas/pokerRoom.schema';
import { CreateRoomDto } from './dto/create-room.dto';
import { PokerGateway } from './adapters/poker.gateway';
export declare class PokerService {
    private readonly statsService;
    private roomsModel;
    private readonly users;
    private pokerGateway;
    constructor(statsService: StatsService, roomsModel: Model<PokerRoomDocument>, users: Model<User>, pokerGateway: PokerGateway);
    getRoom(roomId: any): Promise<import("./schemas/pokerRoom.schema").PokerRoom & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    listRooms(params: any): Promise<PokerRoom[]>;
    countRooms(property: string, value: any): Promise<any>;
    createRoom(roomDto: CreateRoomDto): Promise<PokerRoom>;
    deleteRoom(roomId: string): Promise<boolean>;
    deleteAllRooms(): Promise<boolean>;
    joinRoom(roomId: string, playerId: string, userId: string, password?: string): Promise<any>;
    leaveRoom(roomId: string, playerId: string): Promise<any>;
    playerDisconnected(roomId: string, playerId: string): Promise<any>;
    reconnectPlayer(roomId: any, id: string, userId: any): Promise<any>;
    restartGame(roomId: string): Promise<any>;
    saveRoom(room: PokerRoomDocument & {
        _id: any;
    }): void;
    startGame(roomId: string): Promise<any>;
    afterTurn(room: PokerRoomDocument & {
        _id: any;
    }): Promise<any>;
    timeoutFold(room: PokerRoomDocument & {
        _id: any;
    }, userId: any, save?: boolean): Promise<any>;
    check(roomId: any, userId: any): Promise<any>;
    fold(roomId: any, userId: any): Promise<any>;
    private roundFinished;
    private nextRound;
    private afterDeal;
    call(roomId: any, userId: any): Promise<any>;
    allIn(roomId: any, userId: any): Promise<any>;
    raiseToPot(roomId: any, userId: any, halfPot?: boolean): Promise<any>;
    bet(roomId: any, userId: any, raise?: boolean, bet?: number): Promise<any>;
}
