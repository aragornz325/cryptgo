import { useState, useEffect } from "react"
import ChipPokerStatus from "../chipPokerStatus/chipPokerStatus"
import { usePoker } from "../PokerProvider"


const OwnPlayer = ({i,username,hand,roomBalance, ownPlayer }) => {

    const { data, currentBet, winnersCards } = usePoker()
    const [statusPlayer, setStatusPlayer] = useState()
    const [isDealer, setIsDealer] = useState()

    useEffect(() => {
        if (data.activeRound?.bigBlind.includes(ownPlayer._id)) {setStatusPlayer("B")}
        else if (data.activeRound?.smallBlind === ownPlayer._id) {setStatusPlayer("S")} else {setStatusPlayer(null)}
        // else if (data.activeRound?.bigBlind.includes(ownPlayer._id) && data.activeRound?.dealer === ownPlayer._id )  { setStatusPlayer("B y D") }
        // else if (data.activeRound?.dealer === ownPlayer._id) {setStatusPlayer("D")}
        // else if (data.activeRound?.dealer && data.activeRound?.smallBlind === ownPlayer._id) {setStatusPlayer("S y D")}
    }, [data])
    
    useEffect(() => {
        if (data.activeRound?.dealer === ownPlayer._id) {setIsDealer("D")} else {setIsDealer(null)}
    }, [data])

    return (
        <article className={`table-player player-${i}`} key={username}>
            <div className="table-player__hand">
                {hand?.map((card,index) => {
                    return <img 
                        key={index}
                        className={`table-player__hand-image 
                            ${data.activeRound?.roundState === 5 && !winnersCards?.some(c => c.toUpperCase() === card.toUpperCase()) ? 'not-winner-card' : ''}
                        `}
                        src={`/assets/cartas/${card}.png`}  
                    />
                } )}
            </div>
            {
                data.activeRound ? 
                    <div className="ownplayerBet__bet ">
                        <img className="ownplayerBet__bet-image" src="/assets/fichas/f1.png" />
                        <p className="ownplayerBet__bet-text" >{ownPlayer.currentBet ? ownPlayer.currentBet : 0}</p>
                        {
                            statusPlayer ? <ChipPokerStatus text={statusPlayer}/> : null 
                        }
                        {
                            isDealer ? <ChipPokerStatus text={isDealer}/> : null
                        }   
                    </div> 
                : null
            }
        </article>
    )
}
export default OwnPlayer    
