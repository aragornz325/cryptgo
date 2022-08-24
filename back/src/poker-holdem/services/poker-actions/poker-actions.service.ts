import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';
import { PokerRoomDocument } from 'src/poker-holdem/schemas/poker-room.schema';
import { PokerPlayerDocument } from 'src/poker-holdem/schemas/poker-player.schema';
import { BetState, BetStateDocument } from 'src/poker-holdem/schemas/bet-state.schema';
import { PokerRoundDocument } from 'src/poker-holdem/schemas/poker-round.schema';


@Injectable()
export class PokerActionsService {

    constructor(
        @InjectModel('PokerRoom') private pokerRoomsModel: Model<PokerRoomDocument>,
		@InjectModel('PokerPlayer') private pokerPlayerModel: Model<PokerPlayerDocument>,
		@InjectModel('PokerRound') private pokerRoundModel: Model<PokerRoundDocument>,
		@InjectModel('BetState') private betStateModel: Model<BetStateDocument>,
        @InjectModel('User') private readonly users: Model<User>
    ) {}
	
	async bet(roomId: string, playerId: string, betAction: number, amount?: number ) {
		try {

			const room = await this.pokerRoomsModel.findById(roomId)
			if (!room) return { error: new NotFoundException('Room was not found.') }
			
			const activeRound = await this.pokerRoundModel.findById(room.activeRound)
				.populate<{ players: [PokerPlayerDocument] }>('players')

			// Check if is it's turn.
			if (activeRound.activePlayer.toString() !== playerId) return { error: new ForbiddenException("It's not player's turn.") }
			
			// Sort player for work with ordered array.
			const players = activeRound.players;
			players.sort( (a,b) => a.seat > b.seat ? 1 : -1 );
			const activePlayerIndex = players.findIndex( p => p._id.toString() === activeRound.activePlayer.toString() )

			// Check if player can do action
			const betState = await this.betStateModel.findById(players[activePlayerIndex].betState)
			const canDoAction = betState.betActions.some( ba => ba._id === betAction);
			if (!canDoAction) return { error: new ForbiddenException('Player cannot perform this action.') }
		
		
		/*
			Main goal for each action is set:
				substract to player's room balance,
				set player's current bet, 
				set room's current bet,
				add to room pot.
			After that, should:
				set new players betState.
				look for next player.
				if not nextPlayer, set new roundState
				if roundState
		*/
		const takeCoinsFromPlayerAndIncreaseHisBet = (newCoins: number) => {
			players[activePlayerIndex].roomBalance -= newCoins;
			players[activePlayerIndex].currentBet += newCoins;
			activeRound.pot += newCoins;
		}

		// SEE BET ACTIONS FOR IDs MEANING
		switch(betAction) {
			case 1: { // SMALL-BLIND
				const newCoins = room.entryPrice / 2;
				
				takeCoinsFromPlayerAndIncreaseHisBet(newCoins)
				activeRound.currentBet = newCoins;
				
				// EVEN
				players[activePlayerIndex].betState = 4;
				
				break;
			}
			case 2: { // BIG-BLIND
				const newCoins = room.entryPrice / 2;
	
				takeCoinsFromPlayerAndIncreaseHisBet(newCoins)
				activeRound.currentBet = newCoins;
				
				// EVEN
				players[activePlayerIndex].betState = 4;
				
				break;
			}
			case 3: { // CALL
				// ====>>> If player hasn't enough money, reject action or perform all-in ?
				const newCoins = activeRound.currentBet - players[activePlayerIndex].currentBet;
				
				takeCoinsFromPlayerAndIncreaseHisBet(newCoins)
				
				// EVEN
				players[activePlayerIndex].betState = 4;
				
				break;
			}
			case 4: { // RAISE
				const newCoins = amount;
				
				takeCoinsFromPlayerAndIncreaseHisBet(newCoins)
				activeRound.currentBet += newCoins;
				
				// EVEN
				players[activePlayerIndex].betState = 4;
				
				break;
			}
			case 5: { // CHECK
				// If current player bet is even to round bet
				// or player has performed a fold
				// accept action
				break;
			}
			case 6: { // ALL-IN
				const newCoins = players[activePlayerIndex].roomBalance;
				
				takeCoinsFromPlayerAndIncreaseHisBet(newCoins)
				activeRound.currentBet += newCoins;
				
				// ALL-IN
				players[activePlayerIndex].betState = 5;
				
				break;
			}
			case 7: { // FOLD
				players[activePlayerIndex].betState = 6;
			}
		}
		players[activePlayerIndex].didAnAction = true;
		
		// Set player's new state
		players.forEach( player => {
			// Already setted betState for activePlayer
			if (player._id.toString() === activeRound.activePlayer) return;
			const notMutableStates = [1,2,5,6]
			// The only mutable state for non active players is even?
			if ( notMutableStates.some( bs => bs === player.betState ) ) return;
			if ( player.currentBet < activeRound.currentBet ) player.betState = 3
		} );
		
		// Set nextPlayer
		const nextIndex = (index: number,array: any[]) => index === array.length - 1 ? 0 : index + 1;
		let current = nextIndex(activePlayerIndex,players);
		let indexNextPlayer: number;
		
		while( !indexNextPlayer || current !== activePlayerIndex ) {
			const { betState, didAnAction } = players[current];
			if (
				   betState === 2 // BIG-BLIND
				|| betState === 3 // LOWER
				|| !didAnAction   // DIDN'T PLAY YET
			) indexNextPlayer = current;
			current = nextIndex(current,players);
		}

		if (indexNextPlayer) activeRound.activePlayer = players[indexNextPlayer]._id;
		// No next players means round finish, so can pass to next state
		else {
			const dealerIndex = players.findIndex( p => p._id.toString() === activeRound.dealer.toString())
			const nextToDealarIndex = nextIndex(dealerIndex,players)
			activeRound.activePlayer = players[nextToDealarIndex]
			activeRound.roundState  += 1
		}

		await activeRound.save()
		return { activeRound }
		} catch(err) {
			console.log(err);
			return { error: new InternalServerErrorException(err.message) }
		}

	}
	
	async updatePlayersState() {

	}
	
	async checkRoundState() {
		
	}
}	

