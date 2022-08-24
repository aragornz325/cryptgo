import { GameType } from './interfaces/pokerRoom.interface';
import { PokerService } from './poker.service';
export declare class PokerController {
    private pokerService;
    constructor(pokerService: PokerService);
    listRooms(query: any): Promise<{
        name: string;
        status: import("./interfaces/pokerRoom.interface").RoomStatus;
        type: GameType;
        maxPlayers: number;
        players: {
            userId: any;
            balance: any;
        }[];
        roomId: string;
        entryPrice: number;
        rake: number;
    }[]>;
    getRoom(params: any): Promise<{
        name: string;
        status: import("./interfaces/pokerRoom.interface").RoomStatus;
        type: GameType;
        maxPlayers: number;
        players: {
            userId: any;
            balance: any;
        }[];
        roomId: any;
        entryPrice: number;
        rake: number;
    }>;
    createRoom(data: any): Promise<{
        name: any;
        roomId: any;
        error: any;
    }>;
    deleteRoom(query: any): Promise<boolean>;
}
