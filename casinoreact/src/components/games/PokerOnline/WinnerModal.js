import { useEffect, useState } from "react";
import { Winner, WinnerPlayer, WinnerTxt } from "./PokerStyles"
import { FaStar } from "react-icons/fa";
import { usePoker } from "./PokerProvider";
import { useCountdownTimer } from 'use-countdown-timer';

const WinnerModal = () => {

    const { data } = usePoker()
    const { roomState, activeRound } = data
       
    const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
        timer: new Date(data.startTime).getTime() - Date.now(),
        autostart: true
      });
      
    useEffect(() => {
        if (activeRound?.roundState === 5) start()
    },[activeRound])
    const winner = activeRound?.winners

    return (
        <Winner className={activeRound?.roundState == 5 ? "open" : "close"}>
            <WinnerPlayer>
                <FaStar />
                <WinnerTxt>
                    <i>{activeRound?.players?.find(player => player._id === activeRound.activePlayer)?.user?.username} WINS</i>
                </WinnerTxt>
                <FaStar />
            </WinnerPlayer>
            <p>
            {
                winner ? 
                winner.map((item, index) => {
                    return <p key={index}> {item.nameHand}</p>
                })  : null
            }
            </p>
            {
                isRunning &&
                <p>Reinicia en {Math.ceil(countdown / 1000)}s</p>
            }            
        </Winner>
    )
}
export default WinnerModal