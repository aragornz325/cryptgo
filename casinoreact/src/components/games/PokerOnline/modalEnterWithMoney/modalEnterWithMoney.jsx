import { useCallback, useEffect, useState} from 'react'
import { CgClose } from 'react-icons/cg'
import { usePoker } from '../PokerProvider'

const ModalEnterWithMoney = ({ ownPlayer }) => {

    const { data, joinEnterBalance } = usePoker()
    const [range, setRange] = useState(data.entryPrice)
    const [modal, setModal] = useState(true)

    useEffect(()=>{
        if(Object.keys(ownPlayer).length > 0){
            setModal(false)
        }
    },[ownPlayer])

    // Button Less
    const handleButtomLess = () => {
        if ( range <= data.entryPrice ) {
            console.log("cant do less")
        } else if ((range - Math.round((9000 * 10) / 100)) < data.entryPrice) {
            setRange(data.entryPrice)
        } else {
            setRange(range - Math.round((9000 * 10) / 100));
        }
    }
    const handleButtomMore = () => {
        if ( range >= 9000 ) {
            console.log("can do more")
        } else if ((Number(range) + Math.round((9000 * 10) / 100)) > 9000) {
            setRange(9000)
        } else {
            setRange(Number(range) + Math.round((9000 * 10) / 100))
        }
    }

    // Range to send money to poker game 
    const handleChangeRange = useCallback((event) => {
        setRange(event.target.value)
    }, [])
    
    
    // Confir start money in the game
    const handleButtonCheck = () => {
        joinEnterBalance({
            enterBalance: range
        })
        setModal(false)
    }

    // Close modal.
    const handleCloseModal = () => {
        setModal(false)
    }

    return (
        <section className={modal ? "pokerModal" : "modalStatus"} >
            <div className='pokerModal__box'>
            <div className='pokerModal__box__close'>
                <CgClose onClick={handleCloseModal}/>
            </div>
                <div className='pokerModal__box__title'>
                    <h1>Place your bet</h1>
                </div>
                <div className='pokerModal__box__range'>
                    <div className="pokerModal__box__range__slider">
                        <div className="pokerModal__box__range__slider__money">
                            <h1> Min: {data.entryPrice} </h1>
                        </div>
                            <button
                                className="pokerModal__box__range__slider-button"
                                onClick={handleButtomLess}> - </button>
                            <div className="">
                                <input 
                                    step={Math.round((10 / 9000) * 100 )} 
                                    type="range" 
                                    className=""
                                    min={data.entryPrice} 
                                    max={9000} 
                                    value={range} 
                                    onChange={handleChangeRange} />
                            </div>
                            <button
                                className="pokerModal__box__range__slider-button"
                                onClick={handleButtomMore}> + 
                            </button>
                            <h1>{range}</h1>
                    </div>
                    <button className="pokerModal__box__range__check" onClick={handleButtonCheck} > ✓ </button>
                </div>
                {/* Monedas removidas */}
                {/* <div className='pokerModal__box__money'>
                    <img src="assets/fichas/f1.png" alt='one'/>
                    <img src="assets/fichas/f5.png" alt='five'/>
                    <img src="assets/fichas/f10.png" alt='ten'/>
                    <img src="assets/fichas/f25.png" alt='twentyFive'/>
                    <img src="assets/fichas/f50.png" alt='fifty'/>
                    <img src="assets/fichas/f100.png" alt='oneHundred '/>
                    <img src="assets/fichas/f200.png" alt='twoHundred'/>
                    <img src="assets/fichas/f500.png" alt='fiftyHundred'/>
                    <img src="assets/fichas/f1000.png" alt='oneThousand'/>
                </div> */}
            </div>
        </section>
    )
}

export default ModalEnterWithMoney