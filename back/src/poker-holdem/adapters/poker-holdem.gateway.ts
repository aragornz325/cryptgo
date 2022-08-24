import { Inject, Injectable } from "@nestjs/common";
import { 
    ConnectedSocket, 
    MessageBody, 
    SubscribeMessage, 
    WebSocketGateway, 
    WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { PokerRoomsService } from "../services/poker-rooms/poker-rooms.service";
import { JoinRoomDto } from '../dto/join-room.dto'
import { PokerGameService } from "../services/poker-game/poker-game.service";
import { PokerActionsService } from "../services/poker-actions/poker-actions.service";
import { BetDto } from "../dto/bet.dto";


// const client = new Socket('ws://apicasino.herokuapp.com')
// const pokerNamespace = client({ namespace: poker-holdem })
// const blackjack = client({ namespace: blackjack })
@Injectable()
@WebSocketGateway(4001,{ namespace: 'poker-holdem' })
export class PokerHoldemGateway {
    constructor(
        @Inject(PokerRoomsService) private pokerRoomsService: PokerRoomsService,
        @Inject(PokerGameService) private pokerGameService: PokerGameService,
        @Inject(PokerActionsService) private pokerActionService: PokerActionsService
    ){}

    @WebSocketServer()
    server: Server

    @SubscribeMessage('connection')
    handleConnection(@ConnectedSocket() client: Socket) {   
        console.log(` ===>>> New client in poker-holdem: ${ client.id }`)
    }
    
    @SubscribeMessage('see-room')
    seeRoom(
        @MessageBody() joinRoomDto: JoinRoomDto,
        @ConnectedSocket() client: Socket
    ) {
        console.log(` ===> Client ${client.id} seeing room ${joinRoomDto.roomId}`)
        client.join(joinRoomDto.roomId);
    }
    
    @SubscribeMessage('join')
    async joinRoom(
        @MessageBody() joinRoomDto: JoinRoomDto,
        @ConnectedSocket() client: Socket
    ) {
        console.log(` ===> Client ${client.id} is trying to join room ${joinRoomDto.roomId}`)
        const result = await this.pokerRoomsService.joinRoom(joinRoomDto)
        if (result.error) return;
        this.server.to(joinRoomDto.roomId).emit('refresh',result);
        
    }
    
    @SubscribeMessage('bet')
    async bet(@MessageBody() { roomId, playerId, betAction, raiseAmount }: BetDto) {
        console.log(` ===> Client `)
        const result = await this.pokerActionService.bet(roomId, playerId, betAction, raiseAmount)
        if (result.error) return;
        this.server.to(roomId).emit('refresh',result);
    }

    @SubscribeMessage('disconnect')
    async handleDisconnection(){
        console.log('disconn')
    }

}
