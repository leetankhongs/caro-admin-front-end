import React from 'react';

import GameArea from './GameArea/GameArea';
import ChatArea from './ChatArea/index';
import { useParams } from "react-router-dom";
import CallAuthAPI from './../../utils/CallAuthAPI'
import Authorization from './../../utils/callAuth'
import { ACCESS_TOKEN } from '../../constant/variables';
import { Grid } from "@material-ui/core";



const Game = () => {
  const { id } = useParams();
  const [login, setLogin] = React.useState(true);
  const [player1, setPlayer1] = React.useState(null);
  const [player2, setPlayer2] = React.useState(null);
  const [roomID, setRoomID] = React.useState(null)
  const [isConnect, setIsConnect] = React.useState(false);
  const [stepHistory, setStepHistory] = React.useState([]);
  const [stepNumber, setstepNumber] = React.useState(-1);
  const [chats, setChats] = React.useState([])


  React.useEffect(() => {
    const fetchData = async () => {
      const match = await CallAuthAPI(`matchs/${id}`, 'GET', null, JSON.parse(localStorage.getItem(ACCESS_TOKEN)))
      setPlayer1({
        user: {
          id: match.data.player1ID,
          name: match.data.player1Name,
          cup: match.data.player1Cup,
          avatarImagePath: match.data.player1Image
        },
        isHost: true
      })
      setPlayer2({
        user: {
          id: match.data.player2ID,
          name: match.data.player2Name,
          cup: match.data.player2Cup,
          avatarImagePath: match.data.player2Image
        },
        isHost: false
      })

      setRoomID(match.data.roomId)
      setIsConnect(true)

      const chats = await CallAuthAPI(`chats/match?roomID=${match.data.roomId}&startTime=${match.data.startDate}&endTime=${match.data.endDate}`, 'GET', null, JSON.parse(localStorage.getItem(ACCESS_TOKEN)))
      const user = await Authorization('auth/profile', JSON.parse(localStorage.getItem(ACCESS_TOKEN)))
      const chatList = chats.data.map(item => ({
        host: item.userID === user.data.id,
        name: item.name,
        content: item.content,
        time: item.sendDate

      }))
      setChats(chatList)

      const stepList = await CallAuthAPI(`steps/matches/${id}`, 'GET', null, JSON.parse(localStorage.getItem(ACCESS_TOKEN)))
      const steps = stepList.data.map(step => ({
        userID: step.userId,
        position: step.position,
        time: step.time
      }))

      steps.unshift({
        userID: null,
        position: null,
        time: match.data.startDate
      })
      setStepHistory(steps)
    }

    fetchData();
  }, [id])


  const jumpTo = (step) => {
    setstepNumber(step);
  }

  return (
    <Grid container style={{ backgroundColor: "#ffdac3" }}>
      {isConnect && login ? (
        <>
          <Grid item xs={9}>
            <GameArea player1={player1} player2={player2} roomID={roomID} steps={stepHistory} stepNumber={stepNumber} />
          </Grid>
          <Grid item xs={3}>
            <ChatArea roomID={id} jumpTo={jumpTo} stepHistory={stepHistory} chats={chats} />
          </Grid>
        </>
      ) : null}
    </Grid>
  )
}
export default Game;