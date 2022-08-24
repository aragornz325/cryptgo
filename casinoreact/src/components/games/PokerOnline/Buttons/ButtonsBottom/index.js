import React, { useState, useEffect, useCallback } from "react";
import { usePoker } from "../../PokerProvider";
import { AiOutlineCheck } from "react-icons/ai";
import {
	Buttons,
	Container,
	Button,
	ContainerRaise,
	ButtonsRaise,
	AllIn,
	HalfPot,
	FullPot,
	Bet,
	RaiseTo,
	CircleCheck,
	ButtonLess,
	ButtonMore,
	H3,
	Input,
	UserInfoBox,
	UserInfo,
	UserName,
	UserBalance,
	UserPicture,
	UserPictureBox
} from "./ButtonsBottomStyles";
import Slider from "react-input-slider";
import { Howl } from "howler";
import { FaMinus } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
const BottomsButtom = ({ user, ownPlayer }) => {

	
	const { data, keypadUserSound, turnPlayer, currentBet, actions, foldAction, currentPot , callAction ,checkAction , raisetoAction, allInAction } = usePoker()
    const [rangeValue, setRangeValue] = useState(data.entryPrice)
    const [betActions, setBetActions] = useState([])
    const [raiseActions, setRaiseActions] = useState(false)
    const [allInStatus, setAllInStatus] = useState(false)
	
	const handleConfirmButton = () => {
		if ( allInStatus) {
		    allInAction(rangeValue)
		} else {
			raisetoAction(rangeValue)
		}
	}

	const [callSound] = useState(
		new Howl({
			src: ["/assets/sound/checkSound.mp3"],
			volume: 1,
		})
	)
	const [checkSound] = useState(
		new Howl({
			src: ["/assets/sound/checkSound.mp3"],
			volume: 1,
		})
	)
	const [foldSound] = useState(
		new Howl({
			src: ["/assets/sound/foldSound.mp3"],
			volume: 1,
		})
	)
	const [halfpotSound] = useState(
		new Howl({
			src: ["/assets/sound/chip.mp3"],
			volume: 1,
		})
	)
	const [allinSound] = useState(
		new Howl({
			src: ["/assets/sound/Allin.mp3"],
			volume: 1,
		})
	)
	
    useEffect(() => {
		setBetActions(user.betActions)
        setRaiseActions(false)
    }, [user?.betActions])

    useEffect(() => {
        setRangeValue(currentBet)
    }, [currentBet])
	
	
    // All buttons actions avaible.
    const handleCheckButton = () => { 
		checkAction()
		if (keypadUserSound) checkSound.play();
	}
    const handleRaiseToButton = () => { 
        setRaiseActions(!raiseActions)
    }
    const handleFoldButton = () => { 
		foldAction(); 
		if (keypadUserSound) foldSound.play();
	}
    
	const handleCallButton = () => { 
		callAction();
		if (keypadUserSound) callSound.play();
	}

    const handleAllinButton = () => { 
        setRangeValue(ownPlayer.roomBalance)
        setAllInStatus(true) 
		if (keypadUserSound && !raiseActions) allinSound.play();

    }
    const handleHalfpotButton = () => { 
		if (currentPot / 2 <= data.entryPrice ) {
			setRangeValue(data.entryPrice)
		} else {
			setRangeValue(Math.round(currentPot / 2)) 
		}
        setAllInStatus(false)
		if (keypadUserSound && !raiseActions) halfpotSound.play();

    }
    const handleFullpotButton = () => { 
        setRangeValue(currentPot) 
        setAllInStatus(false)
		if (keypadUserSound && !raiseActions) halfpotSound.play();

    }

    const handleChangeRange = useCallback((event) => {
        setRangeValue(Number(event))
        if (event === ownPlayer?.roomBalance) {
            setAllInStatus(true)
        } else {
            setAllInStatus(false)
        }
    })

    const handleButtonLess = () => { 
		if (rangeValue <= currentBet) {
			console.log("cant do less")
		} else if ((rangeValue - Math.round((ownPlayer?.roomBalance * 10) / 100)) < currentBet) {
            setRangeValue(currentBet)
        } else {
            setRangeValue(rangeValue - Math.round((ownPlayer?.roomBalance * 10) / 100));
        }
	}

    const handleButtonMore = () => {
		if (rangeValue >= ownPlayer?.roomBalance) {
			console.log("cant do more")
		} else if ((rangeValue + Math.round((ownPlayer?.roomBalance * 10) / 100)) > ownPlayer?.roomBalance) {
            setRangeValue(ownPlayer?.roomBalance)
        } else {
            setRangeValue(rangeValue + Math.round((ownPlayer?.roomBalance * 10) / 100));
        }
	}

    // Left buttoms harcode
    const hardcodeButtons = [
        { text: actions?.CHECK ? "Check" : "CALL", action: actions?.CHECK ? handleCheckButton : handleCallButton, className: `check` },
        { text: "Fold", action: handleFoldButton, className: `fold` },
        { text: "Raise To", action: handleRaiseToButton, className: `raiseto` },
    ]

    // Right buttoms harcode
    const hardcodeButtonsRight = [
        { text: "All in", action: handleAllinButton, className: `allin` },
        { text: "Half Pot", action: handleHalfpotButton, className: `halfpot` },
        { text: "Full Pot", action: handleFullpotButton, className: `fullpot` },
    ]

	return (
		<Container>
			<Buttons>
				{hardcodeButtons.map(action => {
					return (
						<Button raiseActions={raiseActions} key={action.text} disabled={ownPlayer?._id !== turnPlayer._id} color={action.color} onClick={ownPlayer?._id === turnPlayer._id && action.action}>
							{action.text}
						</Button>
					)
				})}
			</Buttons>
			<UserInfoBox>
				<UserInfo>
					<UserName>{ownPlayer?.user?.username || user.username}</UserName>
					<UserBalance>{ownPlayer?.roomBalance}</UserBalance>
				</UserInfo>
				<UserPictureBox turn={ownPlayer?._id === turnPlayer._id}>
				{ownPlayer?._id === turnPlayer._id && <CountdownCircleTimer
                    isPlaying
                    duration={20}
                    colorsTime={[20, 14, 7, 0]}
                    colors={['#22C914', '#F7B801', '#A30000', '#FF0000']}
                    strokeWidth={8}
                    trailColor="#d9d9d9"
										size={window.innerWidth / 100 * 7}
										/>}
				<UserPicture src="/assets/3memoji.png" />
				</UserPictureBox>
			</UserInfoBox>
			<ContainerRaise>
				<ButtonsRaise raiseActions={raiseActions}>
					<Bet>
						<AllIn onClick={handleAllinButton}>
							All in
						</AllIn>
						<HalfPot onClick={handleHalfpotButton}>
							Half Pot
						</HalfPot>
						<FullPot onClick={handleFullpotButton}>
							Full Pot
						</FullPot>
					</Bet>
					<RaiseTo>
						<H3>Bet</H3>
						<Input name='number' value={rangeValue} type='text' />
						<ButtonLess onClick={handleButtonLess}>
							<FaMinus size={'.8vw'} />
						</ButtonLess>
						<Slider
							styles={{
								track: {
									width: "13.5vw",
									height: '.8vw',
									border: "1px solid #fff",
									background: "transparent",
								},
								active: {
									backgroundColor: "#FE17FF",
								},
								thumb: {
									width: '1vw',
									height: '1vw',
									backgroundColor: "#A602A7",
									//background: "url(/assets/Coin.png)",
								},
							}}
							axis='x'
							xstep={1}
							x={rangeValue}
							xmax={ownPlayer?.roomBalance}
							xmin={data.entryPrice}
							onChange={e => handleChangeRange(e.x)}
						/>
						<ButtonMore onClick={handleButtonMore}>
							<TiPlus size={'.8vw'} />
						</ButtonMore>
					</RaiseTo>
				</ButtonsRaise>
				<CircleCheck 
					raiseActions={raiseActions} 
					disabled={ownPlayer?._id !== turnPlayer._id} 
					onClick={ownPlayer?._id === turnPlayer._id && (raiseActions ? null : handleConfirmButton)} >
					<AiOutlineCheck size={25} />
				</CircleCheck>
			</ContainerRaise>
		</Container>
	);
};

export default BottomsButtom;
