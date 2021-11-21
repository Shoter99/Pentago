import React from 'react';
import './App.css';
import InBoard from './components/InBoard';
import {useState} from 'react';
function App() {
  const [board, setBoard] = useState([
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ])
  const [turn, setTurn] = useState('white')
  const [winner, setWinner] = useState('')
  const [fullBoard, setFullBoard] = useState(false)
  const changeColor = (row, col) => {
    let newBoard = [...board]
    if (newBoard[row][col] === 'empty' && !winner ) {
      newBoard[row][col] = turn
      setBoard(newBoard)
      setTurn(turn === 'white' ? 'black' : 'white')
      checkForWinner()
      checkForFullBoard()
    }
    
  }
  const checkForFullBoard = () => {
    let newBoard = [...board]
    let isempty = false
    for (let i = 0; i < newBoard.length; i++) {
      for (let j = 0; j < newBoard[i].length; j++) {
        if (newBoard[i][j] === 'empty') {
          isempty = true
          break
        }
      }
    }
    if (!isempty) {
      setFullBoard(true)
    }
  }
  const ResetBoard = () => {
    setBoard([
      ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
      ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
    ])
    setTurn('white')
    setWinner('')
    setFullBoard(false)
  }
  const checkForWinner = () => {
    var white = 0
    var black = 0
    let newBoard = [...board]
    checkHorizontalPosibility(white,black,newBoard, 1, 0)
    checkHorizontalPosibility(white,black,newBoard, 0, 1)
    checkVerticalPosibility(white,black,newBoard, 2, 0, 0)
    checkVerticalPosibility(white,black,newBoard, 0, 2, 3)
    }
const checkHorizontalPosibility = (white, black, newBoard, f, s) => {
  for (let i = 0; i < 4; i+=2) {
    for (let j = 0; j < 3; j++) {
      white = 0
      black = 0
      if(newBoard[i+f][s+j*3] == 'white' && newBoard[i+f][1+s+j*3] == 'white') {
        white+=2
      }
      else if(newBoard[i+f][s+j*3] == 'black' && newBoard[i+f][1+s+j*3] == 'black')
      {
        black+=2
      }
      else continue

      for (let k = 0; k < 3; k++) {
        
        if (newBoard[i+s][k+j*3] == 'white') white++
        if (newBoard[i+s][k+j*3] == 'black') black++
        

      }
      if(white == 5) {
        setWinner('white')
        break}
      if(black == 5){
        setWinner('black')
        break
      
      
    }
    
    }}
}
const checkVerticalPosibility = (white, black, newBoard, f, s, t) => {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++){
      white = 0
      black = 0
      if(newBoard[i+f][j+t] == 'white' && newBoard[i+f][j+3+t] == 'white'){
        white+=2

      }
      else if(newBoard[i+f][j+t] == 'black' && newBoard[i+f][j+3+t] == 'black'){
        black+=2

      }
      else continue
      for (let k = 0; k < 3; k++){
        if(newBoard[i+s][j+3*k] == 'white') white++
        if(newBoard[i+s][j+3*k] == 'black') black++
      }
      if(white == 5) {
        setWinner('white')
        break}
      if(black == 5){
        setWinner('black')
        break

    }
  }
}}

  
  return (
    <div className="App">
      <h1>Pentago</h1>
      
      {winner ? <><h2>Winner is {winner}</h2> <span className="restart"  onClick={() => ResetBoard()} >Restart</span> </> : fullBoard ? <h2 className="restart"  onClick={() => ResetBoard()} >Restart</h2> :<h2>Now is <span style={{color:'#a4161a'}}>{turn} </span>turn</h2>}
      <div className="board">
        {board.map((row, index) => {
          return (
            <InBoard board={row} row={index} turn={turn} changeColor={changeColor} />
            )})}

        </div>
    </div>
  );
}

export default App;
