import Player from "./Player"

const Players = ({ players , ownPlayer }) => {
    return (
        <div>
            {/* {players.map(({ _id, hand = [], roomBalance, user, currentBet, ...player  }, i) => { */}
                {players.map((player, i) => {
                return (
                    <Player 
                        key={player?._id}
                        i={i}
                        id={player?._id}
                        username={player?.user.username}
                        roomBalance={player?.roomBalance}
                        hand={player?.hand}
                        currentBet={player?.currentBet}
                        ownPlayer={ownPlayer}
                    />
                )
            })}
        </div>
    )
}
export default Players