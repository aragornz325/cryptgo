import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
const context = createContext()
const { Provider } = context;

export const usePoker = () => {
    return useContext(context)
}

const PokerProvider = ({ children, roomId, user }) => {
    
    const [turnPlayer, setTurnPlayer] = useState({});
    const [currentBet, setCurrentBet] = useState(0);
    const [socket, setSocket] = useState();
    const [data, setData] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [joined, setJoined] = useState(false);
    const [joinBalance, setJoinBalance] = useState(0)
    const [joinRequest, setJoinRequest] = useState(false)
    const [winnersCards, setWinnersCards] = useState([])
    const [keypadUserSound, setKeypadUserSound] = useState(true)
    const [fullScreen, setFullScreen] = useState(false)


    const handle = useFullScreenHandle();

    const viewFullScreen = () => {
        setFullScreen(!fullScreen)
    }

    const keypadSound = () => {
        setKeypadUserSound(!keypadUserSound)
    }

    const emit = (event, data) => {
        socket.emit(event, data)
    }

    const allInAction = (amount) => {
        emit("bet", {
            playerId: data.activeRound.activePlayer,
            roomId: roomId,
            raiseAmount: amount,
            betAction: 6
        })
    }

    const checkAction = () => {
        emit("bet", {
            playerId: data.activeRound.activePlayer,
            roomId: roomId,
            raiseAmount: 1,
            betAction: 5
        })
    }

    const foldAction = () => {
        emit("bet", {
            playerId: data.activeRound.activePlayer,
            roomId: roomId,
            raiseAmount: 1,
            betAction: 7
        })
    }

    const raisetoAction = (amount) => {
        emit("bet", {
            playerId: data.activeRound.activePlayer,
            roomId: roomId,
            raiseAmount: amount,
            betAction: 4
        })
    }

    const callAction = () => {
        emit("bet", {
            playerId: data.activeRound.activePlayer,
            roomId: roomId,
            raiseAmount: 1,
            betAction: 3
        })
    }

    // Enter balance
    const joinEnterBalance = ({ enterBalance }) => {
        //console.log("enter balance", enterBalance)
        setJoinBalance(enterBalance)
        setJoinRequest(true)
    }


    const refresh = async () => {
        const response = await fetch(`https://apicasino.herokuapp.com/poker-holdem/room/${roomId}`)
        const data = await response.json()
        setData(data)
    }

    const actions = useMemo(() => turnPlayer.betState?.betActions.reduce((acc, action) => {
        acc[action.name] = true;
        return acc;
    }, {}), [turnPlayer.betState?.betActions])

    const contextValue = {
        viewFullScreen,
        fullScreen,
        keypadUserSound,
        keypadSound,
        turnPlayer,
        setTurnPlayer,
        checkAction,
        foldAction,
        callAction,
        joinEnterBalance,
        actions,
        currentBet,
        setCurrentBet,
        raisetoAction,
        data,
        currentPot: data.activeRound?.pot,
        user,
        emit,
        roomId,
        allInAction,
        setData,
        winnersCards
    }

    const getDataRooms = async (user) => {
        try {
            const room_request = await fetch(`https://apicasino.herokuapp.com/poker-holdem/room/${roomId}`);
            const room = await room_request.json();

            const player = room?.activeRound?.players.find(u => u.user._id === user._id) || {};

            const socket = io(`wss://apicasino.herokuapp.com/poker-holdem`);
            socket.on("connect", () => {
                setSocket(socket);
            })
            socket.on("refresh", async data => {
                setData(data)
                if (!loaded) {
                    setLoaded(true)
                }
            })
            socket.emit("see-room", {
                roomId: roomId,
                playerId: player._id
            })
            setSubscribed(true)
            if (room.error) {
                throw new Error(room.message)
            }
            setData(room);
            if (!loaded) {
                setLoaded(true)
            }
        } catch (error) {
            console.log(error)
        }
    };

    //Inicializa al montar el componente una unica vez la coneccion con el servidor socket y espera a conectarse para guardarlo como estado, adicionalmente se pone a escuchar la room para activar el evento refresh que se emite cuando se actualiza la room y lo guarda en un estado del componente (data)
    useEffect(() => {
        if (user && !socket) {
            getDataRooms(user)
            /* const socket = io(`wss://apicasino.herokuapp.com/poker-holdem`);
            setSocket(socket);
            //socket.on("connect", () => {
            //})
            socket.on("refresh", async data => {
                setData(data)
                if (!loaded) {
                    setLoaded(true)
                }
            })
            socket.emit("see-room", {
                roomId: roomId
            })
            setSubscribed(true)
            return () => socket.close(); */
        }
    }, [user])

    //Este efecto hace el auto join por ahora con el balance automatico en 9000
    useEffect(() => {
        if (socket && user && subscribed) {
            if (!joined && data?.players?.length > 0) {
                if (!data.players.find(p => p.user._id === user._id)) {
                    if (joinRequest) {
                        socket.emit("join", {
                            roomId: roomId,
                            userId: user._id,
                            roomBalance: joinBalance
                        })
                        setTimeout(() => {
                            refresh()
                        }, 1000)
                    }
                } else {
                    setJoined(true)
                }
            }

            if (data?.players?.length == 0) {
                if (joinRequest) {
                    socket.emit("join", {
                        roomId: roomId,
                        userId: user._id,
                        roomBalance: joinBalance
                    })
                    setTimeout(() => {
                        refresh()
                    }, 1000)
                }
            }
        }
    }, [socket, user, subscribed, data, joinRequest])

    useEffect(() => {
        if (data.activeRound?.winners) {
            let cards = []
            for (const winner of data.activeRound?.winners) {
                cards = cards.concat(winner.solvedHandArray)
            }
            console.log({cards})
            setWinnersCards(cards)
        }
    },[data])

    return (
        <Provider value={contextValue}>
            {loaded ? (
                children
            ) : (
                <div>Loading...</div>
            )}
        </Provider>
    )
}

export default PokerProvider;