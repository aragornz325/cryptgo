import { useEffect } from "react";
import { useState } from "react";
import PokerHoldemTable from "../Table/pokerHoldemTable";
import { usePoker } from "../PokerProvider";
import Players from "./Players";
import ModalEnterWithMoney from "../modalEnterWithMoney/modalEnterWithMoney";
import { Buttons } from "./styles";
import ButtonsBottom from '../Buttons/ButtonsBottom';
import ContentButtonsTop from "../Buttons/ButtonsTop/contentButtonsTop";

const PokerWithoutFullScreen = () => {

	// const [players, setPlayers] = useState(data.players);
	const [ players, setPlayers] = useState([]);
	const [ ownPlayer, setOwnPlayer] = useState({});
	const { setTurnPlayer, setCurrentBet , data , user } = usePoker()

	//Este efecto le da formato a los players para que tengan el username y balance que ya tenian antes pero le agrega currentBet
	useEffect(() => {

		let players_with_bet = data.players || [];

		if (data?.activeRound?.players.length > 0) {
			players_with_bet = players_with_bet.map(player => {
				return { ...player, ...data.activeRound.players.find(p => p._id === player._id) }
			})
		}

		let ordered_players = []

		if (players_with_bet.length > 0) {
			for (let i = 1; i <= data.maxPlayers; i++) {
				const player = players_with_bet.find(player => player.seat === i)
				if (player) ordered_players.push(player)
				else ordered_players.push(null)
			}
			let own_player = ordered_players.find(p => p?.user._id === user._id)
			if (own_player) {
				const ownPlayerSeat = own_player.seat
				if (ownPlayerSeat !== 1) {
					const tail = ordered_players.splice(0,ownPlayerSeat-1)
					ordered_players = ordered_players.concat(tail)
				}
				console.log({ ordered_players })				
				setOwnPlayer(ordered_players.find(p => p?.user?._id === user._id) || ordered_players)
			}
		}

		setPlayers(ordered_players)
		setTurnPlayer(data.activeRound?.players.find(p => p._id === data.activeRound.activePlayer) || "")
		setCurrentBet(data.activeRound?.currentBet || 0)
	}, [data])

	return (
		<div style={{position: 'relative'}} className="poker">
			<ContentButtonsTop />
			<ModalEnterWithMoney ownPlayer={ownPlayer}/> 
			<div className="table">
				<img className="table__background" src='/assets/tablePoker.png' />
				<Players players={players} ownPlayer={ownPlayer}/>
				<PokerHoldemTable />
			</div>
			<Buttons>
				<ButtonsBottom
					user={user}
					users={players}
					ownPlayer={ownPlayer}
				/>
			</Buttons>
		 	<div style={{height: '100px'}} />
		</div>
	)
}

export default PokerWithoutFullScreen