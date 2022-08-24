import { OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PokerService } from '../poker.service';
export declare class PokerGateway implements OnGatewayConnection {
    private readonly pokerService;
    constructor(pokerService: PokerService);
    server: Server;
    disconnectPlayer(roomId: any, playerId: string, message?: string): Promise<void>;
    sendMessage(roomId: string, message: any): Promise<void>;
    handleEvent(data: any, client: Socket): Promise<boolean>;
    handleConnection(client: any, ...args: any[]): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    afterInit(server: any): Promise<void>;
}
