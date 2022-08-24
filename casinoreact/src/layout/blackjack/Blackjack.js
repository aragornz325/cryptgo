// Npm packages
import React, { useState, useEffect } from "react";

// React functional components
import Navbar from "../../components/navigation/NavBar";
import Table from "../../components/games/Blackjack/Table";
import Chip from "../../components/games/Blackjack/Chip";
import BjUi from "../../components/games/Blackjack/BjUi";
import AlertBar from "../../components/games/AlertBar";
import OptionButton from "../../components/games/Blackjack/OptionButton";
import StatusBar from "../../components/games/StatusBar";
import StaticCard from "../../components/games/Blackjack/StaticCard";
import HiddenBtn from "../../components/games/Blackjack/HiddenBtn";
import Marker from "../../components/games/Blackjack/Marker";
import Deck from "../../components/games/Blackjack/Deck";
import DeckResult from "../../components/games/Blackjack/DeckResult";

// Api Controllers
import * as api from "../../controllers";

// Redux store action (dispatch) creators
import store from "../../store/reducers/store";
import setGameState from "../../store/actionCreators/setGameState";
import setAlert from "../../store/actionCreators/setAlert";
import addCard from "../../store/actionCreators/addCard";
import resetCard from "../../store/actionCreators/resetCard";
import setGames from "../../store/actionCreators/setGames";
import setIndexedCards from "../../store/actionCreators/setIndexedCards";
import setGameIndex from "../../store/actionCreators/setGameIndex";

// Styled layout components
import { FaExpand } from "react-icons/fa";
import { FullScreen, GameView } from "../styles";
import AudioPlayer from "../../components/audio/AudioPlayer";
import Store from "../../components/main/Store";
import Layout from '../../components/Layout';

const Blackjack = () => {
	const [cards, setCards] = useState(store.getState().cards);
	const [dealerCards, setDealerCards] = useState([]);
	const [currentValue, setCurrentValue] = useState([]);
	const [bet, setBet] = useState(0);
	const [premio, setPremio] = useState("");
	const [dealerValue, setDealerValue] = useState(0);
	const [index, setIndex] = useState(1);
	const [newDealerCards, setNewDealerCards] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [gameStates, setGameStates] = useState([false, false, false]);
	const [endState, setEndState] = useState([]);
	const [doubles, setDoubles] = useState([false, false, false]);
	const [pairs, setPairs] = useState([false, false, false]);
	const [splits, setSplits] = useState([]);
	const [splitIndex, setSplitIndex] = useState(0);
	const [fullscreen, setFullscreen] = useState(false);
	const [splitted, setSplitted] = useState(false);
	const [id, setId] = useState(undefined);
	const [user, setUser] = useState(undefined);
	const [ties, setTies] = useState(undefined);

	useEffect(async () => {
		const newUser = await api.getUserData();
		setUser(newUser);
		setId(newUser._id);
	}, []);

	store.subscribe(() => {
		setCards(store.getState().cards);
		setBet(store.getState().bet);
	});
	const start = async (userId) => {
		setCards([]);
		if (store.getState().games.indexOf(true) < 0) {
			return setAlert({
				display: true,
				text: "No games were defined!",
				color: "red",
			});
		}
		console.log(userId, store.getState().bet, store.getState().games)
		let response = await api.startBJ( userId, store.getState().bet, store.getState().games);
		console.log("Start:", await response);
		if (!response["error"] && response !== undefined) {
			setGames([...response.games]);
			setGameStates([...response.games]);
			setSplits([...response.userSplitted]);
			setIndexedCards([...response.currentHand]);
			setGameState("started");
			setPremio("");
			setDealerValue(response.dealerHandValue);
			setDealerCards([...response.dealerHand]);
			setNewDealerCards(response.dealerHand.length);
			setDoubles([...response.canDouble]);
			setPairs([...response.hasPair]);
			setSplitted(false);
			if (
				response.handStand.length &&
				response.userStand.indexOf(false) &&
				response.handStand[response.userStand.indexOf(false)] &&
				response.handStand[response.userStand.indexOf(false)][0]
			) {
				setGameIndex([response.userStand.indexOf(false), 1]);
				setSplitIndex(1);
			} else {
				setGameIndex([response.userStand.indexOf(false), 0]);
				setSplitIndex(0);
			}
			setCurrentIndex(response.userStand.indexOf(false));
			if (
				response.userSplitted &&
				response.userSplitted.indexOf(true) === -1
			) {
				setGameIndex(response.userStand.indexOf(false));
			}
			setIndex(response.userStand.indexOf(false));
			setValueChecked(response);
		} else {
			setAlert({ display: true, text: response["error"], color: "red" });
		}
	};

	const finish = (response) => {
		setDealerValue(response.dealerHandValue);
		setNewDealerCards(response.dealerHand.length - newDealerCards);
		setDealerCards([...response.dealerHand]);
		setTies(response.tie);
		setEndState(response.userWon);
		setGameState("finished");
		let newPremio = 0;
		response.userWon.map((i, index) => {
			if (i) {
				return (newPremio += 2 * bet[index]);
			} else {
				return newPremio;
			}
		});
		setPremio(newPremio);

		console.log(store.getState().games);
	};

	const nextSet = (response) => {
		let newGames = store.getState().games;
		newGames[currentIndex] = false;
		setGames(newGames);
		if (store.getState().games.indexOf(true) < 0) {
			finish(response);
		} else {
			if (
				response &&
				response.userStand[
				store.getState().games.indexOf(true, currentIndex + 1)
				]
			) {
				let newGames = store.getState().games;
				newGames[
					store.getState().games.indexOf(true, currentIndex + 1)
				] = false;
				setGames(newGames);
			}
			if (
				gameStates[
				store.getState().games.indexOf(true, currentIndex + 1)
				]
			) {
				setCurrentIndex(
					store.getState().games.indexOf(true, currentIndex + 1)
				);
				setGameIndex(
					store.getState().games.indexOf(true, currentIndex + 1)
				);
				setIndex(
					store.getState().games.indexOf(true, currentIndex + 1)
				);
			} else {
				finish(response);
			}
		}
	};

	const setValueChecked = (response) => {
		let hasSplit = false;
		response.currentHandValue.map((value) => {
			if (Array.isArray(value)) {
				return (hasSplit = true);
			} else {
				return value;
			}
		});
		if (hasSplit) {
			let newHandValues = [
				...response.currentHandValue.slice(
					0,
					response.userSplitted.indexOf(true)
				),
				String(
					response.currentHandValue[
					response.userSplitted.indexOf(true)
					][0]
				) +
				" / " +
				String(
					response.currentHandValue[
					response.userSplitted.indexOf(true)
					][1]
				),
				...response.currentHandValue.slice(
					response.userSplitted.indexOf(true) + 1
				),
			];
			setCurrentValue(newHandValues);
		} else {
			setCurrentValue(response.currentHandValue);
		}
	};

	const hit = async (userId, index) => {
		let response = await api.hitBJ(userId, index);
		console.log("Hit:", await response);
		setDoubles([...response.canDouble]);
		setCurrentValue(response.currentHandValue);
		addCard(
			response.currentHand[index][response.currentHand[index].length - 1],
			index
		);
		if (response.userIsBusted[index]) {
			nextSet(response);
		}
	};

	const stand = async (userId, index) => {
		let response = await api.standBJ(userId, index);
		console.log("Stand:", await response);
		if (!response["error"] && response !== undefined) {
			nextSet(response);
		} else {
			setAlert({ display: true, text: response["error"], color: "red" });
		}
	};

	const double = async (userId, index) => {
		let response = await api.doubleBJ(userId, index);
		console.log("Double:", await response);
		setCurrentValue(response.currentHandValue);
		addCard(
			response.currentHand[index][response.currentHand[index].length - 1],
			index
		);
		nextSet(response);
	};

	const split = async (userId, index) => {
		let response = await api.splitBJ(userId, index);
		console.log("Split:", await response);
		setDoubles([...response.canDouble]);
		if (
			response.handStand[response.userStand.indexOf(false)][0] &&
			response.handStand[response.userStand.indexOf(false)][1]
		) {
			nextSet(response);
		} else if (response.handStand[response.userStand.indexOf(false)][0]) {
			setSplitIndex(1);
			setGameIndex([currentIndex, 1]);
		} else {
			setGameIndex([currentIndex, 0]);
			setSplitIndex(0);
		}
		setSplits([...response.userSplitted]);
		setSplitted(true);
		setValueChecked(response);
		setIndexedCards([...response.currentHand]);
	};

	const restart = () => {
		setCurrentValue([]);
		setPremio("");
		setGameState("none");
		setAlert({ display: false });
		resetCard();
		setDealerCards([]);
		setDealerValue("");
		setGameIndex([]);
		setGames([
			...store.getState().bet.map((item) => {
				if (item > 0) {
					return true;
				} else {
					return false;
				}
			}),
		]);
	};

	const splitHit = async (id, index, handIndex) => {
		const response = await api.splitHitBJ(id, index, handIndex);
		console.log("Split Hit:", response);
		if (response["error"]) {
			return setAlert({
				display: true,
				text: response["error"],
				color: "red",
			});
		}
		setDoubles([...response.canDouble]);
		setIndexedCards([...response.currentHand]);
		setValueChecked(response);
		if (response.userStand[index]) {
			nextSet(response);
		} else if (response.userIsBusted[index][handIndex]) {
			setGameIndex([currentIndex, 1]);
			setSplitIndex(1);
		}
	};

	const splitStand = async (id, index, handIndex) => {
		const response = await api.splitStandBJ(id, index, handIndex);
		console.log("Split Stand:", response);
		if (!response["error"] && response !== undefined) {
			if (response.userStand[index]) {
				nextSet(response);
			} else {
				setGameIndex([currentIndex, 1]);
				setSplitIndex(1);
			}
		} else {
			setAlert({ display: true, text: response["error"], color: "red" });
		}
	};

	const splitDouble = async (id, index, handIndex) => {
		const response = await api.splitDoubleBJ(id, index, handIndex);
		console.log("Split Double:", response);
		if (!response["error"] && response !== undefined) {
			setIndexedCards([...response.currentHand]);
			setValueChecked(response);
			if (response.userStand[index]) {
				nextSet(response);
			} else {
				setGameIndex([currentIndex, 1]);
				setSplitIndex(1);
			}
		} else {
			setAlert({ display: true, text: response["error"], color: "red" });
		}
	};

	const fullscreenHandler = () => {
		const elem = document.querySelector("#gameview");
		if (fullscreen && document.fullscreenElement) {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				/* Safari */
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) {
				/* IE11 */
				document.msExitFullscreen();
			}
		} else if (!fullscreen) {
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.webkitRequestFullscreen) {
				/* Safari */
				elem.webkitRequestFullscreen();
			} else if (elem.msRequestFullscreen) {
				/* IE11 */
				elem.msRequestFullscreen();
			}
		}
		return setFullscreen(!fullscreen);
	};

	return (
		<Layout>
				<GameView
					id="gameview"
					style={
						fullscreen
							? {
								width: "100vw",
								height: "calc( 100vw / 16 * 9 )",
								zIndex: 10000,
							}
							: {}
					}
				>
					<FullScreen onClick={() => fullscreenHandler()}>
						<FaExpand />
					</FullScreen>

					<Table />

					<AudioPlayer
						url="/assets/sound/background-music-1.mp3"
						loop={true}
						slider={true}
					/>

					<StatusBar
						itemA={{ title: "GAME", content: "BLACKJACK" }}
						itemB={{
							title: "BET",
							content:
								store.getState().bet[0] +
								" - " +
								store.getState().bet[1] +
								" - " +
								store.getState().bet[2],
						}}
						itemC={{ title: "PRIZE", content: premio }}
					/>

					<Deck />

					{store.getState().gameState === "none" ? (
						<BjUi index={index} />
					) : (
						""
					)}

					{store.getState().gameState === "started" ? (
						<>
							{gameStates
								? gameStates.map((item, index) => {
									if (
										currentIndex > index &&
										gameStates[index]
									) {
										return (
											<DeckResult
												key={index}
												index={index}
												background="yellow"
												text="STAND"
											/>
										);
									} else {
										return "";
									}
								})
								: ""}
						</>
					) : (
						""
					)}

					{store.getState().gameState === "finished" ? (
						<>
							{endState.map((item, index) => {
								if (gameStates[index]) {
									if (item.length === 2) {
										return (
											<>
												<DeckResult
													key={index}
													index={index}
													background={
														ties[index][0] ? 'gold' :
															item[0]
																? "lightgreen"
																: "red"
													}
													text={
														ties[index][0] ? 'TIE' : item[0] ? "WON" : "LOST"
													}
													marginLeft="-8%"
												/>
												<DeckResult
													key={index + 3}
													index={index}
													background={
														ties[index][1] ? 'gold' :
															item[1]
																? "lightgreen"
																: "red"
													}
													text={
														ties[index][1] ? 'TIE' : item[1] ? "WON" : "LOST"
													}
													marginLeft="8%"
												/>
											</>
										);
									} else {
										if (ties.length && ties[index]) {
											return (
												<DeckResult
													key={index}
													index={index}
													background={
														'gold'
													}
													text='TIE'
												/>
											);
										} else {
											return (
												<DeckResult
													key={index}
													index={index}
													background={
														item ? "lightgreen" : "red"
													}
													text={item ? "WON" : "LOST"}
												/>
											);
										}
									}
								} else {
									return "";
								}
							})}
						</>
					) : (
						""
					)}

					<Chip index="0" />
					<HiddenBtn
						width="7%"
						height="12%"
						top="30%"
						left="8%"
						clickFunction={() => {
							setIndex(0);
						}}
						index="0"
					/>
					<Chip index="1" />
					<HiddenBtn
						width="7%"
						height="12%"
						top="35.5%"
						left="46.65%"
						clickFunction={() => {
							setIndex(1);
						}}
						index="1"
					/>
					<Chip index="2" />
					<HiddenBtn
						width="7%"
						height="12%"
						top="30%"
						left="85.35%"
						clickFunction={() => {
							setIndex(2);
						}}
						index="2"
					/>

					{index === 0 ? (
						<Marker
							width="5.5%"
							height="10%"
							top="30.4%"
							left="8.4%"
						/>
					) : index === 1 ? (
						<Marker
							width="5.5%"
							height="10%"
							top="36%"
							left="47.2%"
						/>
					) : (
						<Marker
							width="5.5%"
							height="10%"
							top="30.4%"
							left="85.8%"
						/>
					)}

					<div
						style={{
							zIndex: 900000,
							position: "absolute",
							width: "90%",
							height: "10%",
							display: "flex",
							flexDirection: "row",
							flexWrap: "wrap",
							alignItems: "center",
							justifyContent: "flex-end",
							bottom: "4%",
							right: 0,
						}}
					>
						{store.getState().gameState === "none" && bet ? (
							<OptionButton
								text="START"
								clickFunction={() => {
									start(id);
								}}
							/>
						) : (
							""
						)}
						{store.getState().gameState === "started" ? (
							<>
								<OptionButton
									text="HIT"
									clickFunction={() => {
										splits[currentIndex]
											? splitHit(
												id,
												currentIndex,
												splitIndex
											)
											: hit(id, currentIndex);
									}}
								/>
								<OptionButton
									text="STAND"
									clickFunction={() => {
										splits[currentIndex]
											? splitStand(
												id,
												currentIndex,
												splitIndex
											)
											: stand(id, currentIndex);
									}}
								/>
								{splits[currentIndex] ? (
									<>
										{doubles[currentIndex] &&
											doubles[currentIndex][splitIndex] ? (
											<OptionButton
												text="DOUBLE"
												clickFunction={() => {
													splitDouble(
														id,
														currentIndex,
														splitIndex
													);
												}}
											/>
										) : (
											""
										)}
									</>
								) : (
									<>
										{doubles[currentIndex] ? (
											<OptionButton
												text="DOUBLE"
												clickFunction={() => {
													double(id, currentIndex);
												}}
											/>
										) : (
											""
										)}
										{pairs[currentIndex] && !splitted ? (
											<OptionButton
												text="SPLIT"
												clickFunction={() => {
													split(id, currentIndex);
												}}
											/>
										) : (
											""
										)}
									</>
								)}
							</>
						) : (
							""
						)}
						{store.getState().gameState === "finished" ? (
							<OptionButton
								text="RESTART"
								clickFunction={() => {
									restart();
								}}
							/>
						) : (
							""
						)}
					</div>

					{currentValue !== [] ? (
						<>
							{currentValue[0] ? (
								<h1
									style={{
										color: "black",
										background: "gold",
										position: "absolute",
										fontSize: "1.5vw",
										bottom: "25%",
										textAlign: "center",
										left: "9%",
										zIndex: "9999999",
										margin: 0,
										padding: ".05vw .5vw .05vw .5vw",
										borderRadius: "1vw",
										border: ".15vw solid black",
									}}
								>
									{currentValue[0]}
								</h1>
							) : (
								""
							)}
							{currentValue[1] ? (
								<h1
									style={{
										color: "black",
										background: "gold",
										position: "absolute",
										fontSize: "1.5vw",
										bottom: "20%",
										textAlign: "center",
										right: "46.75%",
										zIndex: "9999999",
										margin: 0,
										padding: ".05vw .5vw .05vw .5vw",
										borderRadius: "1vw",
										border: ".15vw solid black",
									}}
								>
									{currentValue[1]}
								</h1>
							) : (
								""
							)}
							{currentValue[2] ? (
								<h1
									style={{
										color: "black",
										background: "gold",
										position: "absolute",
										fontSize: "1.5vw",
										bottom: "25%",
										textAlign: "center",
										right: "9%",
										zIndex: "9999999",
										margin: 0,
										padding: ".05vw .5vw .05vw .5vw",
										borderRadius: "1vw",
										border: ".15vw solid black",
									}}
								>
									{currentValue[2]}
								</h1>
							) : (
								""
							)}
							{dealerValue ? (
								<h1
									style={{
										color: "black",
										background: "gold",
										position: "absolute",
										fontSize: "1.5vw",
										top: "15%",
										textAlign: "center",
										right: "46.75%",
										zIndex: "9999999",
										margin: 0,
										padding: ".05vw .5vw .05vw .5vw",
										borderRadius: "1vw",
										border: ".15vw solid black",
									}}
								>
									{dealerValue}
								</h1>
							) : (
								""
							)}
						</>
					) : (
						""
					)}
					<>
						{cards
							? cards.map((cardList, listIndex) => {
								if (
									splits[listIndex] &&
									splits.length &&
									cardList
								) {
									return cardList.map(
										(cardSet, index) => {
											if (
												Array.isArray(cardSet.info)
											) {
												return cardSet.info.map(
													(card, ind) => {
														return (
															<StaticCard
																key={ind}
																game={
																	listIndex
																}
																index={ind}
																imgSrc={`${card.text.toUpperCase()}${card.suite[0].toUpperCase()}`}
																isDealer={
																	false
																}
																splitIndex={
																	index
																}
															/>
														);
													}
												);
											} else if (cardSet.length) {
												return cardSet.map(
													(card, ind) => {
														return (
															<StaticCard
																key={ind}
																game={
																	listIndex
																}
																index={ind}
																imgSrc={`${card.text.toUpperCase()}${card.suite[0].toUpperCase()}`}
																isDealer={
																	false
																}
																splitIndex={
																	index
																}
															/>
														);
													}
												);
											} else {
												return "";
											}
										}
									);
								} else {
									if (cardList && cardList.length) {
										return cardList.map((card, ind) => {
											return (
												<StaticCard
													key={ind}
													game={listIndex}
													index={ind}
													imgSrc={`${card.text.toUpperCase()}${card.suite[0].toUpperCase()}`}
													isDealer={false}
												/>
											);
										});
									} else {
										return "";
									}
								}
							})
							: ""}
					</>
					{dealerCards
						? dealerCards.map((card, ind) => {
							if (card !== null) {
								return (
									<StaticCard
										key={ind}
										index={ind}
										imgSrc={`${card.text.toUpperCase()}${card.suite[0].toUpperCase()}`}
										isDealer={true}
									/>
								);
							} else {
								return "";
							}
						})
						: ""}
					{store.getState().gameState === "started" ? (
						<StaticCard
							index={1}
							imgSrc={`card-back`}
							isDealer={true}
						/>
					) : (
						""
					)}
					<AlertBar />
				</GameView>
		</Layout>
	);
};

export default Blackjack;
