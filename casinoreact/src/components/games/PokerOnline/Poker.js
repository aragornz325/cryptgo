
import React, { useEffect } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import PokerWithFullScreen from "./Main/PokerWithFullScreen";
import PokerWithoutFullScreen from "./Main/PokerWithoutFullScreen";
import { useLocation } from "react-router-dom";
import "./styles.scss"
import PokerProvider from "./PokerProvider";
import WinnerModal from "./WinnerModal";

const Poker = ({ user }) => {

	const handle = useFullScreenHandle();
	const { search } = useLocation();
	const query = new URLSearchParams(search);
	const roomId = query.get("roomId");

	return (
		<PokerProvider roomId={roomId} user={user}>
			<WinnerModal/>
			<div className="poker-container">
				<FullScreen handle={handle}>
					{handle.active ? (
						<PokerWithFullScreen />
					) : (
						<PokerWithoutFullScreen />
					)}
				</FullScreen>
			</div>
		</PokerProvider>
	)
}

export default Poker