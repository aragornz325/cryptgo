import { useState } from 'react'
import { usePoker } from '../PokerProvider'
import 'animate.css'

// dealer + pot + pot money + cards
const PokerHoldemTable = () => {

    // Total pot.
    const { data, roomId , setData, winnersCards } = usePoker()
    const { roomState } = data
    const [loading, setLoading] = useState(false)

    const handleStartRound = () => {
        setLoading(true)
        fetch("https://apicasino.herokuapp.com/poker-holdem/game/start", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    "roomId": roomId
                }
            )
        })
        .then(res=>res.json())
        .then(({newRound:activeRound})=>{
            setData({...data, activeRound})
        })
    }

    return (
        <section className='pokerTable'>
            <div className='dealer'>
                <img src={`/assets/dealer.png`} alt="" className='dealer__character' />
            </div>
            {roomState && roomState._id > 1 ? (
                <>
                    <div className='pot'>
                        <div className='pot__text'>
                            POT
                        </div>
                        <div className='pot__money'>
                            {Math.round(data.activeRound?.pot)}
                        </div>
                    </div>
                    <div className='pokerCards'>
                        {data.activeRound?.roundState > 1 ? (
                            data.activeRound.tableCards.map(card => (
                                <div className='card-container'>
                                    <img src={`/assets/cartas/${card}.png`} alt="" 
                                    className={`card animate__flipInY pokerCards__card front 
                                        ${data.activeRound?.roundState === 5 && !winnersCards?.some(c => c.toUpperCase() === card.toUpperCase()) ? 'not-winner-card' : ''}`
                                    } />
                                    <img src='/assets/cartas/CartaBack.png' alt="emply card" className='emplyCard back card' />
                                </div>
                            ))
                        ) : (
                            // <>
                            //     <EmplyCard />
                            //     <EmplyCard />
                            // </>
                            null
                        )}
                    </div>
                </>
            ) : (
                <button style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} onClick={handleStartRound}>
                    {loading? 'Iniciando...' : 'Iniciar ronda'}
                </button>
            )}
        </section>
    )
}

// Emply card.
const EmplyCard = () => {
    return <img src='/assets/cartas/CartaBack.png' alt="emply card" className='emplyCard' />
}

export default PokerHoldemTable