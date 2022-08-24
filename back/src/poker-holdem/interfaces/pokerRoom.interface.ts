import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Bet as number } from "src/blackjack/interfaces/bet.interface";
import { Player } from "./player.interface";
import { constants } from "../constants";

export enum RoomStatus {
	OPEN = 'OPEN',
	CLOSED = 'CLOSED',
	PLAYING = 'PLAYING',
	FINISHED = "FINISHED"
}
export enum GameType
{
	PUBLIC = 'PUBLIC',
	PRIVATE = 'PRIVATE',
	TOURNAMENT = 'TOURNAMENT'
}

export class PokerRoom {
	players:any[];
	_id:string;
	name:string;
	maxPlayers:number;
	status:RoomStatus;
	type:GameType;
	password?:string;
	
	entryPrice?: number; //entry price
	rakeValue?:  number; //approximate percentage of the pot that goes to the rake ( gets taken from pot in favor of casino ). Keep undefined for no rake at all

	//one of these must be set, otherwise casino isn't earning anything

	initialBet:number; //Low bet for games with limit
	turnBet:number | undefined;
	smallBlind:number;
	bigBlind:number;
	lastRaise:number; // last raise value: (highest bet - previous highest bet)
	raises:number; //Number of raises in the game
	currentBet:number; //Highest bet in the game (only for limit games)
	pot:number;
	round:number;
	dealerIndex:number;

	limit: boolean;
	deck?: any[];
	winners:any[];
	deckHand?:any[];

	timeout:number;
	timeoutId:any;
}