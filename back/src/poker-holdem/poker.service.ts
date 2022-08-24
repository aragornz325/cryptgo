import { ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from 'engine-blackjack-ts';
import { Model, Types} from 'mongoose';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Bet } from 'src/blackjack/interfaces/bet.interface';
import { PokerOfflineSchema } from 'src/poker-offline/schemas/poker_offline.schema';
import { StatsService } from 'src/stats/stats.service';
import { getPotForRoom, getBet, roundRaiseValue, roundBet } from './functions/bet.functions';
import { Player } from './interfaces/player.interface';
import { GameType, PokerRoom, RoomStatus } from './interfaces/pokerRoom.interface';
import { UsersService } from 'src/users/users.service';
import { checkBet } from './functions/checkBets.function';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoutesMapper } from '@nestjs/core/middleware/routes-mapper';
import { randomInt, randomBytes } from 'crypto'
import { WsException } from '@nestjs/websockets';
import { addCoins } from 'src/poker-offline/functions/addCoins.function';
import { ObjectUnsubscribedError } from 'rxjs';

import { User, UserDocument } from 'src/users/schemas/user.schema';
import { PokerRound, PokerRoundDocument } from './schemas/poker-round.schema';
import { PokerPlayer, PokerPlayerDocument } from './schemas/poker-player.schema';
import { BetAction, BetActionDocument } from './schemas/bet-action.schema';
import { BetState, BetStateDocument } from './schemas/bet-state.schema';
import { RoundState, RoundStateDocument } from './schemas/round-state.schema';
import { PokerRoomDocument } from './schemas/poker-room.schema';



const Deck = require('classic-deck');

@Injectable()
export class PokerService {
	
	constructor(
		private readonly statsService: StatsService, 
		
		@InjectModel(User.name) private usersModel: Model<UserDocument>, 
		@InjectModel(PokerRoom.name) private pokerRoomModel: Model<PokerRoomDocument>, 
		@InjectModel(PokerRound.name) private pokerRoundModel: Model<PokerRoundDocument>, 
		@InjectModel(PokerPlayer.name) private pokerPlayerModel: Model<PokerPlayerDocument>,
		
		@InjectModel(BetAction.name) private betActionModel: Model<BetActionDocument>, 
		@InjectModel(BetState.name) private betStateModel: Model<BetStateDocument>, 
		@InjectModel(RoundState.name) private roundStateModel: Model<RoundStateDocument>, 
		
	) {}

	saveRoom(room:PokerRoomDocument&{_id:any}) {
		room.save((err) => {
			if(err) console.log(err);
		});
		return;
	}

	async afterTurn(room: PokerRoom):Promise<any> {
		// let connectedPlayers = room.players.filter( p => p.connected && p.folded == false).length;

		// if(room.timeoutId) clearTimeout(room.timeoutId);

		// if(room.players.filter( p => p.connected && p.folded == false && p.called==true && p.checked==true).length == connectedPlayers || connectedPlayers == 1) {
		// 	//all players have called and checked.
		// 	return this.nextRound(room)
		// 	.then((result) =>{
				
		// 		if(result && result.error) return result;
				
		// 		if(result.event == "finished") {
		// 			this.pokerGateway.sendMessage(room.id,{ type: "gameFinished", winners:result.winners }); //alert room of the winners of the round
		// 			return { ok: true }; //if game ended skip turn logic
		// 		}
		// 		else if(result.event == "deckHand") {
		// 			this.pokerGateway.sendMessage( room.id,{ type:"deckHand", hand:result.deckHand });
		// 		}

		// 		room.players.forEach((p) => p.checked = false);

		// 		// ??????
		// 		let p = room.players.filter(p => p.turn == true).forEach(p=> p.turn = false) //if previous turn player is still connected, remove turn from it

		// 		let player = room.players.find( p => p.connected && p.folded == false); // set turn to the first connected player that hasn't folded
		// 		if (player) {
		// 			player.turn = true;
		// 			this.pokerGateway.sendMessage(room.id,{ type:"turn", turn:player.userId }); // alert the room that it's the next player's turn
		// 			this.timeoutFold(room, player.userId,false);
		// 		}
		// 		room.markModified('timeoutId');
		// 		room.markModified("players");
		// 		room.save();
		// 		return { ok: true };
		// 	});
		// }
		// else {
		// 	//set next turn:
		// 	let player = undefined;
		// 	let players = room.players.filter( p => p.connected)
		// 	for(let i = 0 ; i < players.length ; i++) {
		// 		if(players[i].turn) {
		// 			// if is player's turn
		// 			players[i].turn = false; //remove turn from player
		// 			var next = players.slice(i+1).find( p => p.folded == false)
		// 			if(next) {
		// 				next.turn = true;
		// 				player = next.userId;
		// 			}
		// 			else {
		// 				players = players.filter( p => p.folded == false);
		// 				players[0].turn = true;
		// 				player = players[0].userId;
		// 			}
		// 			break;
		// 		}
		// 	}
		// 	room.markModified('players');
		// 	await this.timeoutFold(room, player, false);
		// 	await room.save();
		// 	this.pokerGateway.sendMessage(room.id,{type:"turn", turn:player});
		// 	this.pokerGateway.sendMessage(room.id,{type:"potTotal", pot:room.pot});
			
		// 	return {ok:true};
		// }
	}

	async timeoutFold(room:PokerRoomDocument&{_id:any}, userId:any, save=true):Promise<any> {
		// room.timeoutId = new Number(setTimeout(()=>
		// {
		// 	this.fold(room.id, userId).then((result) =>
		// 	{
		// 		if(result)
		// 		{
		// 			if(result.error){console.log(result);}
		// 			this.pokerGateway.sendMessage(room.id,{event:'fold',userId:userId})
		// 		}
		// 	});
			
		// }, room.timeout)).valueOf();
		// room.markModified('timeoutId');
		// console.log(`timeout set for ${room.timeout} with id ${room.timeoutId} for player ${userId}`);
		// if(save) await room.save();
	}

	async fold(roomId: any, userId: any) {
		// return await this.pokerRoomModel.findById(new Types.ObjectId(roomId)).then( async (room) => {
		// 	if (room) {
		// 		if(room.round == -1) return {error:"No round in progress"};
		// 		let player = room.players.find(p => p.userId == userId);
		// 		if(!player.turn) return {error:"It's not your turn"};
		// 		if (player && !player.flopped) {
		// 			if(player.folded) return {error:"You already folded"};
		// 			if(room.timeoutId) clearTimeout(room.timeoutId);
		// 			player.folded = true;
		// 			room.markModified('players');
		// 			await room.save();
		// 			return this.afterTurn(room);
		// 		}
		// 		else return false;
		// 	}
		// }).catch(()=>{return {error:"Couldn't fold"}});;
	}
/*
	async flop(roomId: any, userId: any): Promise<any>{
		return await this.roomsModel.findById(new Types.ObjectId(roomId)).then( async (room) => {
			if (room) {
				let player = room.players.find(p => p.userId == userId);
				if (player) {
					if(player.flopped) return {error:'You already floped'};
					player.flopped = true;
					return true;
				}
				else return {error:'Player not found'};
			}
		}).catch(()=>{return {error:"Couldn't join room"}});;
	}
*/
	private async roundFinished(room:PokerRoomDocument&{_id:any}):Promise<any> {
		// room.status = RoomStatus.FINISHED;
		// let prize = Math.floor(room.pot/room.winners.length);
		// this.usersModel.find({userId: {$in: room.winners.map(p => p.userId)}}).then(async (users) => 
		// { 
		// 	users.forEach(async (user) =>
		// 	{
		// 		user.balance += prize; 
		// 	});
			
		// }).catch(()=>{return {error:"Couldn't end round"}});;
		// room.players.forEach((p:Player) =>
		// {
		// 	p.checked = false;
		// 	p.turn = false;
		// 	p.folded = false;
		// });
		
		// room.pot = 0;
		// room.round = -1;
		// room.markModified('players');
		// room.markModified('pot');
		// room.markModified('round');
		// await room.save();
	}

	private async nextRound(room: PokerRoom) {
		// room.round += 1;
		// let folded = room.players.filter(p => p.folded == true).length // get number of players who folded

		// if(folded == room.players.length-1)
		// {
		// 	room.winners = [await room.players.find((p:Player) => p.folded == false && p.connected == true)];
		// 	this.roundFinished(room);
		// 	return {event:'finished', winners:room.winners.map( p => {return {userId:p.userId}} ), pot:room.pot};
		// }
		// if(room.round == 2) // flop
		// {
		// 	room.deckHand = room.deck.splice(room.deck.length-3,3);
		// 	room.markModified('deckHand');
		// 	await room.save();
		// 	return {event:'deckHand', deckHand:room.deckHand};
		// }
		// else if(room.round == 3) // the turn (4th street)
		// {
		// 	room.deckHand = [...room.deckHand,...room.deck.splice(room.deck.length-1,1)];
		// 	room.markModified('deckHand');
		// 	await room.save();
		// 	return {event:'deckHand', deckHand: room.deckHand};
		// }
		// else if(room.round == 4) // the river (5th street)
		// {
		// 	room.deckHand = [...room.deckHand,...room.deck.splice(room.deck.length-1,1)];
		// 	room.markModified('deckHand');
		// 	await room.save();
		// 	return {event:'deckHand', deckHand: room.deckHand};
		// }
		// else if(room.round == 5) // end of game
		// {
		// 	var Hand = require('pokersolver').Hand;
		// 	let activePlayers = room.players.filter((p:Player) => p.folded == false && p.connected == true);
		// 	var hands = activePlayers.map((p:Player) =>
		// 	{
		// 		p.solvedHand = Hand.solve(p.hand.concat(room.deckHand));
		// 		return p.solvedHand;
		// 	});

		// 	let ad = await this.afterDeal(room,hands); //check for any games served on community cards
		// 	if(ad.event == 'finished')
		// 	{
		// 		room.save();
		// 		this.roundFinished(room);
		// 		return {
		// 			event:"finished",
		// 			winners:(ad.winners as Player[]).map( p => {return {id:p.userId, hand:p.solvedHand}}),
		// 			pot:ad.pot
		// 		};
		// 	} //return winners if any game is served

		// 	let winners = Hand.winners(hands);
		// 	if(winners.length>1)
		// 	{
		// 		room.winners = activePlayers.filter(async (p:Player) =>
		// 		{
		// 			return winners.findIndex(w =>{
		// 				return p.solvedHand.cardPool.length == w.cardPool.length &&
		// 				p.solvedHand.cardPool.every((c,i) =>
		// 				{
		// 					c.value == w.cardPool[i].value && c.suit == w.cardPool[i].suit;
		// 				});
		// 			}) != -1;
		// 		}); // get all winners (filter by player hand)
		// 	}
		// 	else
		// 	{
		// 		if(winners.length == 0) return {error:"No winner"};
		// 		room.winners = activePlayers.find((p:Player) =>
		// 		{
		// 			return p.solvedHand.descr == winners[0].descr;
		// 		});
		// 	}
		// 	room.markModified('winners');
		// 	room.markModified('players');
		// 	await room.save();
		// 	this.roundFinished(room);
		// 	return {event:'finished', winners: room.winners.map(p=>{return { userId:p.userId, hand:p.solvedHand}}), room:room};
		// }
		// //room.save(); don't save yet to avoid multiple calls to DB
	}

	private async afterDeal(room:PokerRoomDocument&{_id:any}, hands:any[]):Promise<any>
	{
		// var Hand = require('pokersolver').Hand;
		// let hand = Hand.solve(room.deckHand);
		// // get all hand names from library for further comparison.
		// if(hand.rank == 9) //straight flush
		// {
		// 	if(hand.descr === 'Royal Flush')
		// 	{
		// 		room.winners = room.players.filter((p:Player) => p.connected == true && p.folded == false);
		// 		return await this.roundFinished(room).then((response)=>{
		// 			if(response.error) return response;
		// 			return {event:'finished',reason:'Royal Flush dealed to community cards', room:room}
		// 		});
		// 	}
		// 	else
		// 	{
		// 		let winner = hands.find((h)=>
		// 		{
		// 			h.descr === 'Royal Flush'
		// 		});
		// 		if (winner)
		// 		{
		// 			return {event:'continue', reason:'There is only one winner'}
		// 		}
		// 		else
		// 		{
		// 			room.winners = room.players.filter((p:Player) => p.connected == true && p.folded == false);
		// 			return await this.roundFinished(room).then(()=>{return {event:'finished',reason:'Straight Flush dealed to community cards', room:room}});
		// 		}
		// 	} 
		// }
		// else if(hand.rank == 6) //flush
		// {
		// 	hands.forEach((h)=>
		// 	{
		// 		if(!(h.cards as Array<any>).every((card)=>{ // if player hand hasn't the same (identifiable) cards as community cards
		// 			return (hand.cards as Array<any>).some((handCard)=> handCard.suit == card.suit && handCard.value == card.value) 
		// 		}))
		// 		{
		// 			return {event:'continue', reason:'There is only one winner'}
		// 		}
		// 	});
		// 	//Then all player hands have the same cards as community cards, meaning community cards are the highest value cards
		// 	room.winners = room.players.filter((p:Player) => p.connected == true && p.folded == false);
		// 	return await this.roundFinished(room).then(()=>{return {event:'finished',reason:'Flush dealed to community cards', room:room}});
		// }
		// return {event:'continue', reason:'There is only one winner'}
	}
}
