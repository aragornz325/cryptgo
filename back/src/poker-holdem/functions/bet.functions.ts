import { PokerRoom } from "../interfaces/pokerRoom.interface";
import { PokerRoomDocument } from "../schemas/poker-room.schema";


//function adapted to use numbers instead of bet object. might throw wrong values
export async function getPotForRoom(room:PokerRoomDocument&{_id:any},raise=false,bet?:number, allIn?:boolean, blind?:boolean)
{
	
	// /*doc:
	// 	adds bet to room.
	// 	if room has a limit then:
	// 		bet? -> add bet to room.
	// 		or if raise == true: makes a raise bet 
	// */
	// if(room.limit)
	// {
	// 	if(bet) return undefined;
	// 	else
	// 	{
	// 		room.pot += getBet(room,raise);
	// 		room.markModified('pot');
	// 		return room.pot;
	// 	}
	// }
	// else //no limit room
	// {
	// 	if(bet)
	// 	{
	// 		if( ( bet - (room.currentBet||roundBet(room)) >= roundRaiseValue(room) ) || allIn || blind) //if the new bet raises by at least the raise value
	// 		{
	// 			room.pot += bet;
	// 			room.currentBet = bet;
	// 			room.lastRaise = bet - roundRaiseValue(room);
	// 			room.markModified('pot');
	// 			room.markModified('currentBet');
	// 			room.markModified('lastRaise');
	// 		}
	// 		else return undefined;
	// 	}
	// 	else
	// 	{
	// 		let v = getBet(room,raise); //call or raise
	// 		room.currentBet = v;
	// 		room.pot += v;
	// 		room.markModified('pot');
	// 		room.markModified('currentBet');
	// 		room.markModified('lastRaise');
	// 	}
			
	// 	return room.pot;
	// }
	
}


export function getBet(room:PokerRoom, raise=false):number // call or raise
{
	if(room.limit)
	{
		if(room.round<=2) return room.initialBet*(raise?2:1);
		else return room.turnBet*(raise?2:1);
	}
	else
	{
		if(raise) return (room.currentBet||roundBet(room))+roundRaiseValue(room);
		return (room.currentBet||roundBet(room));
	}
}

export function roundBet(room):number
{
	if(room.round<=2) return room.initialBet;
	else return room.turnBet;
}

export function roundRaiseValue(room:PokerRoom):number //acts as a default when no previous raise was made
{
	if(room.round<=2)
	{
		if(room.lastRaise && room.lastRaise > room.initialBet) return room.lastRaise;
		return room.initialBet;
	}
	else
	{
		if(room.lastRaise && room.lastRaise > room.turnBet) return room.lastRaise;
		return room.turnBet;
	}
}