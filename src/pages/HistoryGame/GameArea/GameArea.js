import React, { useState } from 'react';
// import { Container } from 'react-bootstrap';

import Board from '../Board/Board';
import './styles.css';
import outRoom from './image/back-arrow.svg'
import trophy from './image/trophy.svg'
import key from './image/key.svg'
import "react-circular-progressbar/dist/styles.css";
import { Grid } from "@material-ui/core";
import man from './image/man.svg'
import {Link} from 'react-router-dom'


const GameArea = (props) => {


  const [history, setHistory] = useState([{
    squares: Array(400).fill(null),
    position: null,
  }]);
  const [firstPlayer, setFirstPlayer] = useState(props.player1)
  const [secondPlayer, setSecondPlayer] = useState(props.player2)
  const [stepNumber, setStepNumber] = useState(props.stepNumber);

  const [winner, setWinner] = useState(
    {
      value: null,
      position: []
    }
  )

  React.useEffect(() => {
    setFirstPlayer(props.player1);
    setSecondPlayer(props.player2)
  }, [props.player1, props.player2])

  React.useEffect(() => {
    setStepNumber(props.stepNumber)
  }, [props.stepNumber])

  React.useEffect(() => {
    if (props.steps.length !== 0 && firstPlayer.user && secondPlayer.user) {
      const newHistory = props.steps.slice(1).reduce((preHistory, item, index, arr) => {
        const currentHistory = preHistory.slice(0, index + 1);
        const current = currentHistory[currentHistory.length - 1];
        const squares = current.squares.slice();

        console.log(item.userID, firstPlayer.user.id)
        squares[item.position] = item.userID === firstPlayer.user.id ? 'X' : 'O'
        return currentHistory.concat([{ squares: squares, position: item.position }]);
      }, [{
        squares: Array(400).fill(null),
        position: null,
      }])
      setHistory(newHistory);
      setStepNumber(newHistory.length - 1)
    }
  }, [props.steps, firstPlayer, secondPlayer])

  const newHistory = history;
  const current = newHistory[stepNumber !== -1 ? stepNumber : 0];
  console.log(secondPlayer.user)
  return (
    <>
      <Grid container>
        < Grid item xs={3} className='sidebar-infor' >
          <Grid container justify="center" alignItems="center" >
            <Grid item xs={12}>
              <Grid container justify="space-around"
                alignItems="center">
                <Link to = '/app/histories'>
                  <button className="myButton mt-2" >
                    <img src={outRoom} className='img-out-room' alt='Đang load...'></img>
                  </button>
                </Link>

                <h5 style={{ color: "#DE9B72" }} >Room ID: {props.roomID}</h5>
              </Grid>
            </Grid>
            <Grid item xs={12} className='mid-border player-avatar' style={{ margin: "2vh" }}  >
              <Grid className='inner-border' style={{ position: "relative" }} >
                <Grid container justify="center" alignItems="center" >
                  <h5 style={{ color: "#DE9B72" }} >{firstPlayer.user.name}</h5>
                </Grid>
                <Grid container justify="center" alignItems="center"  >
                  <img src={firstPlayer.user.avatarImagePath === null ? man : firstPlayer.user.avatarImagePath} className="img-fluid z-depth-1 rounded-circle img-avatar" alt="Đang load..." />
                </Grid>
                <Grid container justify="center" alignItems="center">
                  <img src={trophy} className="img-fluid z-depth-1 rounded-circle img-cup" alt="" />
                  <h5 style={{ color: "#DE9B72" }} > &nbsp;  {firstPlayer.user.cup}</h5>
                </Grid>
                {
                  firstPlayer.isHost ? <div style={{ position: "absolute" }}>
                    <img src={key} className="img-fluid z-depth-1 rounded-circle " style={{ height: "5vh" }} alt="Đang load..." />
                  </div> : <></>
                }
              </Grid>
            </Grid>
            <Grid item xs={12} className='mid-border player-avatar' style={{ margin: "2vh" }}  >
              <Grid className='inner-border' style={{ position: "relative" }} >
                <Grid container justify="center" alignItems="center" >
                  <h5 style={{ color: "#DE9B72" }} >{secondPlayer.user.name}</h5>
                </Grid>
                <Grid container justify="center" alignItems="center"  >
                  <img src={secondPlayer.user.avatarImagePath === null ? man : secondPlayer.user.avatarImagePath} className="img-fluid z-depth-1 rounded-circle img-avatar" alt="Đang load..." />
                </Grid>
                <Grid container justify="center" alignItems="center">
                  <img src={trophy} className="img-fluid z-depth-1 rounded-circle img-cup" alt="" />
                  <h5 style={{ color: "#DE9B72" }} > &nbsp;  {secondPlayer.user.cup}</h5>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        </Grid >
        <Grid item xs={9} className="game-board">
          <Grid>
            <Grid container style={{ pointerEvents: "none" }}>
              <Board
                currentPosition={current.position}
                winningSquares={winner.value ? winner.position : []}
                squares={current.squares}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>

  );
}
export default GameArea;