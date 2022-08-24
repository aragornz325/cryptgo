import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Title from '../../components/main/Title';
import { Room, Text, Wrapper } from './styles';
import io from 'socket.io-client';
import { apiURI } from '../../config/keys'

const Rooms = () => {
  const [RoomsData, setRoomsData] = useState([]);
  const [socket, setSocket] = useState(null);
  const [newRoomRequested, setNewRoomRequested] = useState(true);

  useEffect(() => {
    const newSocket = io('wss://apicasino.herokuapp.com/poker-holdem');
    console.log("#### CONNECT SOCKET #### wss://apicasino.herokuapp.com/poker-holdem", {newSocket})
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {

    socket && socket.on('room', res => console.log('socket - room', res))

    return () => {
      // socket.off('message', messageListener);
      // socket.off('deleteMessage', deleteMessageListener);
    };
  }, [socket]);

  useEffect(()=>{
    const a = async() => {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };
      const response = await fetch(`https://apicasino.herokuapp.com/poker-holdem/room/all`, requestOptions)
      .then((res)=>{
        setNewRoomRequested(false)
        return res.json()
      })
      .catch(error => console.log('## GET ROOMS ERROR ##', error));
      console.log("#### GET ROOMS #### https://apicasino.herokuapp.com/poker-holdem/room/all", response)
      setRoomsData(response);
    }
    if(newRoomRequested){
      a();
    }
  }, [newRoomRequested]);

  const handleClickPokerRoom = (room) => {
    window.location = `/PokerOnline?roomId=${room.roomId||room._id}`
    console.log("### CLICKED ON THE ROOM WITH ID: ", room.roomId || room._id)
  }

  // Create new room ## DELETE THIS ##
  const handleCreateRoom = () => {
    fetch("http://apicasino.herokuapp.com/poker-holdem/room", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(
        {
          "type": "PUBLIC",
          "entryPrice": 10,
          "rakeValue": 0.5,
          "maxPlayers": 5,
          "startTimeout": 10000,
          "turnTimeout": 10000
        }
      )
		})
    .then(()=>{
      setNewRoomRequested(true)
    })
	}


  return (
    <Layout selectedLink={7}>
      <Title text="Poker Rooms" handleCreateRoom={handleCreateRoom} />
      <Wrapper>
        {RoomsData.length && !newRoomRequested ? RoomsData.reverse().map(room => {
          const isFull = room.players.length === room.maxPlayers;
          return <Room onClick={() => !isFull && handleClickPokerRoom(room)}>
            <Text style={{color: `#${room._id.slice(3, 9)}`}}>{room._id.slice(room._id.length - 4)}</Text>
            <Text>{room.type}</Text>
            <Text>{room.startTimeout / 1000}s</Text>
            <Text style={isFull ? {color: 'red'} : {}}>{isFull ? 'FULL' : `${room.players.length}/${room.maxPlayers}`}</Text>
            <Text>${room.entryPrice}</Text>
          </Room>
        }) : <Text>LOADING...</Text>}
      </Wrapper>
    </Layout>
  )
}

export default Rooms;