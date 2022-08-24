import styled, { keyframes } from "styled-components";
import * as palette from "../../../utils/colors/palettes/default";

export const Main = styled.main`
	background: ${palette.tableBackground};
	height: calc(75vw * 9 / 16);
	width: 75vw;
	border-radius: 10px;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto;
	position: relative;
	transition: ${palette.tOpen};
`;

export const Content = styled.div`
	width: 100%;
	height: 100%;
`;
export const Children = styled.div`
	height: 100%;
	width: 100%;
	position: relative;
`;
export const Buttons = styled.div`
	display: flex;
	position: absolute;
	justify-content: flex-end;
	align-items: center;
	bottom: 0;
	width: 100%;
`;

const rotateStar = keyframes`
	from {transform: rotate(0deg)}
	to {transform: rotate(360deg)}
`;
export const Winner = styled.div`
	display: none;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: absolute;
	top : 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 50%;
	height: 15%;
	background: linear-gradient(
		270.06deg,
		rgba(217, 217, 217, 0) -2.07%,
		rgba(217, 217, 217, 0.96) 48.41%,
		rgba(217, 217, 217, 0) 99.95%
	);
	border-radius: 16px;
	z-index: 9999999999999999;
	// box-shadow: 0px 0px 10px 1000px rgba(0, 0, 0, 0.5);

	&.open {
		display: flex;
	}
`;
export const WinnerPlayer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;

	svg {
		color: ${palette.pokerWins};
		font-size: 30px;
		animation: ${rotateStar} 8s linear infinite;
	}
`;
export const WinnerTxt = styled.p`
	font-size: 30px;
	font-family: "Inter";
	color: ${palette.pokerWins};
	font-weight: 600;
	letter-spacing: 1px;
	filter: drop-shadow(5px -5px 4px ${palette.pokerWins});
`;

export const Turn = styled.p`
	position: absolute;
	margin: 0;
	bottom: 0.2%;
	left: 11%;
	font-size: 24px;
	color: ${palette.text};
	font-weight: 500;
`;
export const NewRoundContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
`;
export const NewRoundText = styled.p`
	color: ${palette.pokerWins};
`;
export const NewRoundTimer = styled.div`
	color: ${palette.pokerWins};
	padding: 5px;
	border: 2px solid ${palette.pokerWins};
	border-radius: 50%;
`;

// FULL SCREEN
export const WinnerFullScreen = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 56%;
	left: 28%;
	bottom: 25%;
	width: 50%;
	height: 15%;
	background: linear-gradient(
		270.06deg,
		rgba(217, 217, 217, 0) -2.07%,
		rgba(217, 217, 217, 0.96) 48.41%,
		rgba(217, 217, 217, 0) 99.95%
	);
	border-radius: 16px;
	z-index: 9999999999999999;
`;

export const MainFullScreen = styled.main`
	background-image: url("../../../assets/backgroundPoker.jpg");
	background-size: cover;
	background-repeat: no-repeat;
	height: calc(100vw * 9 / 16);
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	z-index: 1000000000000000000000;
	transition: 1s;
`;
export const WrapperFullScreen = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: absolute;
	z-index: 9999999;
	left: 0.5%;
	top: 10%;
	width: 15%;
	padding-left: 10px;
	padding-right: 10px;
	height: 100vw;
`;
export const WinnerPlayeFullScreen = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	transform: translateY(-58%);
	svg {
		color: ${palette.pokerWins};
		font-size: 30px;
		animation: ${rotateStar} 8s linear infinite;
	}
`;
export const ContentFullScreen = styled.div`
	width: 90%;
	height: calc(76vw * 9 / 16);
	display: flex;
	padding-left: 100px;
	align-items: center;
	justify-content: center;
`;
export const ButtonsFullScreen = styled.div`
	display: flex;
	position: absolute;
	justify-content: flex-end;
	align-items: center;
	bottom: 50px;
	right: 30px;
`;
