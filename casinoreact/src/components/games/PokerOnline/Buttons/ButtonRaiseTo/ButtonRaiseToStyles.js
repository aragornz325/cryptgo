import styled from "styled-components";
export const Container = styled.div`
	z-index: 999;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	position: absolute;

	right: 3%;
	width: 40%;
	background: rgba(3, 5, 33, 0.74);
	border: 2px solid #ffffff;
	box-shadow: inset 10px 10px 17px rgba(166, 166, 166, 0.25);
	backdrop-filter: blur(25px);
	border-radius: 48px 48px 0px 48px;
`;
export const H3 = styled.h3`
	font-style: normal;
	font-weight: 500;
	font-size: 1vw;
	line-height: 2vw;
	margin-left: 20px;
	color: rgba(255, 255, 255, 0.31);
`;
export const BG = styled.div`
	display: flex;
	gap: 30%;
	border-radius: 53px;
	width: 75%;
	height: 40px;
	border: 1px solid;
	align-items: center;
	margin-left: 10%;
`;
export const Input = styled.input`
	height: 40%;
	background: none;
	font-style: normal;
	font-weight: 500;
	font-size: 1vw;
	line-height: 24px;

	color: #ffffff;
	border: none;
	width: 30%;
	&:focus {
		border: none;
		outline: none;
	}
`;
export const Children = styled.div`
	border-color: linear-gradient(
		to right,
		rgba(255, 255, 255, 0),
		rgba(255, 255, 255, 0.5),
		rgba(255, 255, 255, 1)
	);
	border-radius: 100%;
	display: flex;
	gap: 2%;
	width: 100%;
	border-radius: 53px;
`;
export const SecondChildren = styled.div`
	margin-left: 10%;
	width: 65%;
`;
export const ThirdChildren = styled.div`
	background-color: #0b1e3e;
	display: flex;
	border: 1px solid #fff;
	align-items: center;
	border-radius: 53px;
	max-height: 3rem;
`;
export const ButtonCheck = styled.button`
	border-color: #edd582;
	background: linear-gradient(93.08deg, #edd582 1.46%, #b99208 112.04%);

	border-radius: 32px;
	cursor: pointer;
	padding: 5px 10px;
	color: #000;
`;
export const ButtonPrimary = styled.button`
	cursor: pointer;
	z-index: 999;
	padding: 5px;
	margin: 0.5rem 1rem 0.5rem 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 100%;

	background: radial-gradient(
		57.69% 198.98% at 57.69% 39.29%,
		rgba(237, 213, 130, 0.65) 0%,
		rgba(185, 146, 8, 0.65) 100%
	);
	border: 2px solid #ffb017;
	box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.91);
`;
export const ButtonMore = styled.button`
	padding: 5px;
	cursor: pointer;
	z-index: 999;
	margin: 0.5rem 0.5rem 0.5rem 1rem;
	display: flex;
	align-items: center;
	border-radius: 100%;
	background: radial-gradient(
		57.69% 198.98% at 57.69% 39.29%,
		rgba(237, 213, 130, 0.65) 0%,
		rgba(185, 146, 8, 0.65) 100%
	);
	border: 2px solid #ffb017;
	box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.91);
`;
