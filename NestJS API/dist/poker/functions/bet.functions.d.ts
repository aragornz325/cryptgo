import { PokerRoom } from "../interfaces/pokerRoom.interface";
import { PokerRoomDocument } from "../schemas/pokerRoom.schema";
export declare function getPotForRoom(room: PokerRoomDocument & {
    _id: any;
}, raise?: boolean, bet?: number): Promise<number | undefined>;
export declare function getBet(room: PokerRoom, raise?: boolean): number;
export declare function roundBet(room: any): number;
export declare function roundRaiseValue(room: PokerRoom): number;
