import { Bet as number } from "src/blackjack/interfaces/bet.interface";
import { User } from "src/users/interfaces/user.interface";
import { PokerRoom } from "../interfaces/pokerRoom.interface";

export function checkBet(room:PokerRoom,raise:boolean,bet:number|number,user:User):any
{
	if(user.balance)
	{
		if(!bet) return {error:"You have to bet some coins"};
		if(user.balance>=bet) return true;
		else return {error:"You don't have enough coins"};
	}
	else return {error:"User does not have coins"};
}