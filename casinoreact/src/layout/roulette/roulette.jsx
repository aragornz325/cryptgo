import React, { useState, useEffect } from "react";
import { useInterval } from "use-interval";

import { World, Wrapper } from "./styles";
import { GameView } from "../styles.js";

import NavBar from "../../components/navigation/NavBar";
import Layout from '../../components/Layout';

import { RouletteGameContainer } from "./styles";

import RouletteWheel from "../../components/games/Roulette/Roulette";
import Table from "../../components/games/Roulette/Table";
import ImgButton from "../../components/games/Roulette/Button";
import Chip from "../../components/games/Roulette/Chip";

import startRoulette from "../../controllers/roulette/startRoulette";
import * as api from "../../controllers";

import store from "../../store/reducers/store";
import { formatBet } from "./auxiliar";
import {
	do_bet_if_possible,
	to_val,
	dif_dict,
} from "../../components/games/logic_asistant";
import StatusBar from "../../components/games/StatusBar";
import Store from "../../components/main/Store";

function Roulette() {
	const [userId, setUserId] = useState("");
	const [user, setUser] = useState(undefined);
	const [userCoins, setUserCoins] = useState({});

	if (user && user["error"]) {
		window.location = "/login";
	}

	const refreshUser = async () => {
		const newUser = await api.getUserData();
		setUser(newUser);
		setUserId(newUser._id);
		setUserCoins(JSON.stringify(newUser.coins));
		return newUser;
	};

	const getRefreshChips = async () => {
		const { coins } = await refreshUser();
		setUserCoins(coins);
		return coins;
	};

	const getChips = () => {
		return userCoins;
	};

	useEffect(async () => {
		const coins = await getRefreshChips();
		setUserCoins(coins);
		//for (let kind in coins) console.log(kind, coins[kind]);
		refreshMenu(coins);
	}, []);

	const [roulette, setRoulette] = useState({});

	const [Spin, setSpin] = useState(false);

	const [Rebet, setRebet] = useState([]);
	const [spinNumber, setSpinNumber] = useState(0);
	const [Autoplay, setAutoplay] = useState(false);

	const [Selected, setSelected] = useState(0);
	const [Menu, setMenu] = useState([]);

	const getSelected = () => {
		let selected = {};
		selected[to_val(Menu[Selected])] = 1;
		return selected;
	};

	const doSpin = async () => {
		if (!roulette.getReady()) return;

		setSpin(true);

		let bets = [];
		store.getState().stacks.map((stack) => {
			return bets.push(
				formatBet(stack.chips, stack.ids, store.getState().cells)
			);
		});

		if (bets.length === 0) return;

		try {
			if (Spin) return;
			await startRoulette(userId, bets).then((response) => {
				setSpin(true);
				setSpinNumber(response.rouletteNumber.number);
				roulette.setPull(response.rouletteNumber.number);
				//console.log(response);
				console.log(response);
				setRebet(store.getState().stacks);

				// store.getState().stacks.map((stack) => {
				// 	return store.dispatch({
				// 		type: "REMOVE_STACK",
				// 		data: stack,
				// 	});
				// });
			});
		} catch (err) {
			throw err;
		}
	};

	const doRebet = async () => {
		const coins = await getRefreshChips();

		//console.log(coins);

		Rebet.map((pre_stack) => {
			return do_bet_if_possible(coins, pre_stack.chips, () => {
				store.dispatch({
					type: "ADD_STACK",
					data: pre_stack,
				});
				setUserCoins(dif_dict(userCoins, pre_stack.chips));
				refreshMenu(dif_dict(userCoins, pre_stack.chips));
			});
		});
	};

	const doRebetSpin = async () => {
		await doRebet();
		setTimeout(() => {
			doSpin();
		}, 500);
	};

	const doClearBets = async () => {
		const coins = await getRefreshChips();

		setUserCoins(coins);

		store.getState().stacks.map((stack) => {
			return store.dispatch({ type: "REMOVE_STACK", data: stack });
		});

		refreshMenu(coins);
	};

	const goShop = () => {};

	const refreshMenu = (a_coins = userCoins) => {
		const coins = a_coins;
		let menu = Object.keys(coins).filter((key) => coins[key] > 1);
		setMenu(menu);
	};

	const doChangeSelected = (action) => {
		if (Menu.length === 0) return;

		switch (action) {
			case "INCREMENT":
				setSelected((Selected + 1) % Menu.length);
				break;
			case "DECREMENT":
				setSelected((Menu.length + Selected - 1) % Menu.length);
				break;
			default:
				break;
		}
	};

	useInterval(
		() => {
			if (Autoplay) doRebetSpin();
		},
		Spin ? null : 2000
	);

	const buttonStyle = {
		width: "60px",
		cursor: "pointer",
	};

	const chipOrShop = () => {
		return Menu.length === 0 || Menu === [] ? (
			<div
				onClick={() => goShop}
				style={{
					...buttonStyle,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				Shop
			</div>
		) : (
			<div style={{ ...buttonStyle, position: "relative" }}>
				<img
					src={`assets/fichas/f${to_val(Menu[Selected])}.png`}
					alt={""}
					style={{
						...buttonStyle,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				/>
				<div
					style={{
						position: "absolute",
						fontWeight: "bold",
						fontSize: "12px",
						bottom: "0",
						right: "0",
						//textShadow: "0px 0px 0.1px black",
						backgroundColor: "#0000009b",
						boxShadow: "0px 0px 0px 1px gold inset",
						borderRadius: "30px",
						padding: "0 4px",
					}}
				>
					{userCoins[Menu[Selected]]}
				</div>
			</div>
		);
	};

	return (
		<Layout>
				<GameView
					style={{
						backgroundImage: 'url("/assets/mesa-poker.jpg")',
						backgroundPosition: "center",
						backgroundSize: "cover",
					}}
				>
					<StatusBar 
						itemA={{ title: "GAME", content: "ROULETTE" }}
						itemB={{ title: "BET", content: "PLAYING" }}
						itemC={{ title: "PRIZE", content: 0 }}
					/>
					<RouletteWheel
						style={{
							position: "absolute",
							top: "15%",
							left: "3%",
							width: "40%",
							height: "70%",
						}}
						lucky_number={spinNumber}
						setRoulette={setRoulette}
						setSpin={setSpin}
					/>
					<Table
						getSelected={getSelected}
						getChips={getChips}
						setChips={setUserCoins}
						refreshMenu={refreshMenu}
						color_squeme={"classic"}
						style={{
							position: "absolute",
							width: "50%",
							top: "35%",
							right: "3%",
						}}
					/>
					<div
						id={"Buttons"}
						style={{
							position: "absolute",
							left: "47%",
							top: "68%",
							display: "flex",
							justifyContent: "space-evenly",
							width: "50%",
						}}
					>
						<div
							id={"Selector"}
							style={{
								display: "flex",
								justifyItems: "space-around",
								alignItems: "center",
								width: "30%",
								color: "white",
								boxShadow: "0px 0px 0px 3px gold inset",
								borderRadius: "30px",
								position: "relative",
								fontSize: "30px",
							}}
						>
							<div
								style={{
									...buttonStyle,
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
								onClick={() => doChangeSelected("DECREMENT")}
							>
								-
							</div>
							{chipOrShop()}
							<div
								onClick={() => doChangeSelected("INCREMENT")}
								style={{
									...buttonStyle,
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								+
							</div>
						</div>
						<ImgButton
							src={"/assets/roulette/spin.png"}
							alt={""}
							style={buttonStyle}
							onClick={doSpin}
						/>
						<ImgButton
							src={"/assets/roulette/rebet.png"}
							alt={""}
							style={buttonStyle}
							onClick={doRebet}
						/>
						<ImgButton
							src={"/assets/roulette/rebet-spin.png"}
							alt={""}
							style={buttonStyle}
							onClick={doRebetSpin}
						/>
						<ImgButton
							src={"/assets/roulette/clear-bets.png"}
							alt={""}
							style={buttonStyle}
							onClick={doClearBets}
						/>
						<ImgButton
							src={"/assets/roulette/auto-play.png"}
							alt={""}
							style={{
								...buttonStyle,
								borderRadius: "100%",
								boxShadow: Autoplay
									? "0px 0px 0px 3px gold inset"
									: "none",
							}}
							onClick={() => {
								setAutoplay(!Autoplay);
							}}
						/>
					</div>
				</GameView>
		</Layout>
	);
}

export default Roulette;
