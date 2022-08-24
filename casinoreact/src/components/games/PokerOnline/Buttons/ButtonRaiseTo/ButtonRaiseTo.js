import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { TiPlus } from "react-icons/ti";
import { FaMinus } from "react-icons/fa";
import Slider from "react-input-slider";
import {
	BG,
	ButtonCheck,
	ButtonMore,
	ButtonPrimary,
	Children,
	Container,
	H3,
	Input,
	SecondChildren,
	ThirdChildren,
} from "./ButtonRaiseToStyles";
import {
	ButtonTwo,
	ButtonTwoAll,
	ButtonTwoFull,
	ButtonTwoHalf,
} from "../ButtonsGame/ButtonsGameStyles";
import { Howl } from "howler";
const ButtonRaiseTo = ({ user, emit, minBet, potTotal }) => {

	const minBet = 1;
	const [bet, setBet] = useState(minBet);

	const soundBet = new Howl({
		src: ["/assets/sound/chip.mp3"],
		volume: 1,
	});
	const soundAllIn = new Howl({
		src: ["/assets/sound/Allin.mp3"],
		volume: 1,
	});
	const betEvent = () => {
		emit("bet", { bet: sliderMinBet.x });
		soundBet.play();
	};
	const AllInEvent = () => {
		emit("allIn");
		soundAllIn.play();
	};

	console.log("asdads", user.balance)
	return (
		<>
			<Container>
				{/*Buttom number*/}
				<BG>
					<H3>Bet</H3>
					<Input name='number' value={bet} type='text' />
				</BG>
				<Children>
					<SecondChildren>
						<ThirdChildren>
							{/*Button less*/}
							<ButtonPrimary onClick={() => setBet(bet-1)}>
								<FaMinus size={'1vw'} />
							</ButtonPrimary>
							{/*Slider*/}
							<Slider
								styles={{
									track: {
										width: "16rem",
										border: "1px solid #fff",
										background: "transparent",
									},
									active: {
										backgroundColor: "#B99208",
									},
									thumb: {
										width: 20,
										height: 20,
										background: "url(/assets/slider.png)",
									},
								}}
								axis='x'
								xstep={Math.round(user.balance / 100)}
								x={bet}
								xmax={user.balance}
								xmin={minBet}
								onChange={({ x }) => 
									setSliderMinBetState((sliderMinBet) => ({
										...sliderMinBet,
										x,
									}))
								}
							/>
							{/*Buttons add*/}
							<ButtonMore onClick={moreNumber}>
								<TiPlus size={13} />
							</ButtonMore>
						</ThirdChildren>
					</SecondChildren>
					{/*Button check */}
					<ButtonCheck onClick={betEvent}>
						<AiOutlineCheck size={22} />
					</ButtonCheck>
				</Children>

				<ButtonTwo>
					<ButtonTwoAll onClick={AllInEvent}>ALL IN</ButtonTwoAll>
					<ButtonTwoFull onClick={() => setSliderMinBetState({ x: potTotal })}>
						FULL POT
					</ButtonTwoFull>
					<ButtonTwoHalf
						onClick={() => setSliderMinBetState({ x: Math.round(potTotal / 2) })}>
						HALF POT
					</ButtonTwoHalf>
				</ButtonTwo>
			</Container>
		</>
	);
};

export default ButtonRaiseTo;
