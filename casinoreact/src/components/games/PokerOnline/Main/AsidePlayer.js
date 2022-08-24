import { TurnLeftTwoTone } from "@mui/icons-material"
import { useState, useEffect } from "react"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import ChipPokerStatus from "../chipPokerStatus/chipPokerStatus"
import { usePoker } from "../PokerProvider"

const AsidePlayer = ({ i, id, username, roomBalance, currentBet, ownPlayer }) => {

    const {turnPlayer, data, winnersCards} = usePoker()
    const [ statusPlayer, setStatusPlayer ] = useState()
    const [ isDealer, setIsDealer ] = useState()
    const [ turnTimeout, setTurnTimeout ] = useState(data.turnTimeout / 1000)
    const [ colorsTimeout, setColorsTimeout ] = useState([])

    useEffect(() => {
        if (turnTimeout) {
            setColorsTimeout([ turnTimeout, turnTimeout - turnTimeout / 3, turnTimeout - (turnTimeout / 3) * 2, 0 ])
        }
    },[turnTimeout])

    let player = data.activeRound?.players.find(player => player._id === id)
    let showCards = (data.activeRound?.roundState == 5 && player?.betState._id !== 6 && player)


    useEffect(() => {
        if (data.activeRound?.bigBlind.includes(id)) {setStatusPlayer("B")}
        else if (data.activeRound?.smallBlind === id) {setStatusPlayer("S")} else {setStatusPlayer(null)}
    }, [data])

    useEffect(() => {
        if (data.activeRound?.dealer === id) {setIsDealer("D")} else {setIsDealer(null)}
    }, [data])
    

    if (id && id === turnPlayer._id) {
        return (
            <article className={`table-player player-${i} turnPlayer`} key={username}>
                <CountdownCircleTimer
                    isPlaying
                    duration={turnTimeout}
                    colorsTime={colorsTimeout}
                    colors={['#22C914', '#F7B801', '#A30000', '#A30000']}
                    size={100}
                    strokeWidth={6}
                    trailColor="#d9d9d9"
                    // BLOCK BUTTONS ON COMPLETE
                    onComplete={()=>{
                        console.log('complete')
                    }}
                >
                    {({ remainingTime }) => (
                        <img className="table-player__avatar" src="/assets/3memoji.png" />
                    )}
                </CountdownCircleTimer>
                <div className="table-player__info">
                    <div className="table-player__name">{username}</div>
                    <div className="table-player__balance">{roomBalance ? Math.round(roomBalance): ''}</div>
                </div>
                <div className="table-player__bet">
                    <img className="table-player__bet-image" src="/assets/fichas/f1.png" />
                    <p className="table-player__bet-text" >{currentBet ? currentBet : 0}</p>
                    {
                        statusPlayer ? <ChipPokerStatus text={statusPlayer}/> : null 
                    }
                    {
                        isDealer ? <ChipPokerStatus text={isDealer}/> : null
                    }   
                </div>
                {
                    player ? 
                    <div className="table-player__hand">
                        <img 
                            className={`table-player__hand-image
                                ${data.activeRound?.roundState === 5 && !winnersCards?.some(c => c.toUpperCase() === player.hand[0]) ? 'not-winner-card' : ''}
                            `} 
                            src={
                                showCards ?
                                `/assets/cartas/${player.hand[0]}.png`: 
                                "/assets/cartas/CartaBack.png" } />
                        <img 
                            className={`table-player__hand-image 
                                ${data.activeRound?.roundState === 5 && !winnersCards?.some(c => c.toUpperCase() === player.hand[1]) ? 'not-winner-card' : ''}
                            `}
                            src={
                            showCards ? // is aWinnerCard ?
                            `/assets/cartas/${player.hand[1]}.png` :
                            "/assets/cartas/CartaBack.png" } />
                    </div> : null
                }
            </article>
        )
    } else {
        return (
            <article className={player ? 
                player.betState._id === 6 ? `table-player player-${i} folderPlayer` :
                 `table-player player-${i} inactivePlayer` : 
                `table-player player-${i} disablePlayer` } key={username}>
                <img className="table-player__avatar" src="/assets/3memoji.png" />
                <div className="table-player__info">
                    <div className="table-player__name">{username}</div>
                    <div className="table-player__balance">{roomBalance ? Math.round(roomBalance):''}</div>
                </div>
                <div className={ player ? "table-player__bet" : "table-player__bet disableBet" }>
                    <img className="table-player__bet-image" src="/assets/fichas/f1.png" />
                    <p className="table-player__bet-text" >{currentBet ? currentBet : 0}</p>
                    {
                        statusPlayer ? <ChipPokerStatus text={statusPlayer}/> : null 
                    }
                    {
                        isDealer ? <ChipPokerStatus text={isDealer}/> : null
                    }   
                </div>
                {
                    player ? 
                        <div className="table-player__hand">
                            <img 
                                className={`table-player__hand-image
                                ${data.activeRound?.roundState === 5 && !winnersCards?.some(c => c.toUpperCase() === player.hand[0]) ? 'not-winner-card' : ''}
                            `}
                                src={
                                showCards ?
                                `/assets/cartas/${player.hand[0]}.png`: 
                                "/assets/cartas/CartaBack.png" } />
                            <img className={`table-player__hand-image
                                ${data.activeRound?.roundState === 5 && !winnersCards?.some(c => c.toUpperCase() === player.hand[1]) ? 'not-winner-card' : ''}
                            `} src={
                                showCards ?
                                `/assets/cartas/${player.hand[1]}.png` :  
                                "/assets/cartas/CartaBack.png" } />
                        </div> : null
                }
            </article>
        )
    }
}
export default AsidePlayer