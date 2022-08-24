import AsidePlayer from "./AsidePlayer";
import OwnPlayer from "./OwnPlayer";

const Player = ({ i, id, hand, username, roomBalance, currentBet, ownPlayer }) => {

    return (
        i ? (
            <AsidePlayer i={i} id={id} username={username} roomBalance={roomBalance} currentBet={currentBet} ownPlayer={ownPlayer}/>
        ) : (
            <OwnPlayer i={i} hand={hand} username={username} ownPlayer={ownPlayer}/>
        )
    )
};

export default Player