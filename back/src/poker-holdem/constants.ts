import { Bet } from 'src/blackjack/interfaces/bet.interface';

export namespace constants
{
	export const defaultInitialBet = {one:2} as Bet;
	export const zeroBet = { one: 0,
		five: 0,
		ten: 0,
		twentyfive: 0,
		fifty: 0,
		hundred: 0,
		twohundred: 0,
		fivehundred: 0,
		thousand: 0} as Bet;

}
