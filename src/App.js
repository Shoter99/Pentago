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
  const [choice, setChoice] = useState(0)
  const [boardToRotate, setBoardToRotate] = useState(0)
  const [infoPanelVisible, setInfoPanelVisible] = useState(false)
  // const [boardToRotateSet, setBoardToRotateSet] = useState(false)
  const changeColor =  (row, col) => {
    let newBoard = [...board]
    if (newBoard[row][col] === 'empty' && !winner ) {
      // RotateTurn(newBoard)
      newBoard[row][col] = turn
      // setBoard(newBoard)
      checkForFullBoard()
      //generate random num 1-4
      // let randomNum = 1
      let randomNum = Math.floor(Math.random() * 4)
      //generate random number 0-1
      let randomNum2 = Math.random()
      // let randomNum2 = 1
      let elem = document.getElementById(`boardnr_`+randomNum)

      if (randomNum2 > 0.5) {
        elem.classList.add('animRight')
        setTimeout(() => {
          elem.classList.remove('animRight')
          RotateBoard(newBoard, randomNum)
      }, 950)
      }
      else {
        elem.classList.add('animLeft')
        setTimeout(() =>{
          elem.classList.remove('animLeft')
          RotateBoardRev(newBoard, randomNum)
        }, 950)
      }
      setTurn(turn === 'white' ? 'black' : 'white')
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
    checkDiagonally(newBoard)
    }
const checkHorizontalPosibility = (white, black, newBoard, f, s) => {
  for (let i = 0; i < 4; i+=2) {
    for (let j = 0; j < 3; j++) {
      white = 0
      black = 0
      if(newBoard[i+f][s+j*3] === 'white' && newBoard[i+f][1+s+j*3] === 'white') {
        white+=2
      }
      else if(newBoard[i+f][s+j*3] === 'black' && newBoard[i+f][1+s+j*3] === 'black')
      {
        black+=2
      }
      else continue

      for (let k = 0; k < 3; k++) {
        
        if (newBoard[i+s][k+j*3] === 'white') white++
        if (newBoard[i+s][k+j*3] === 'black') black++
        

      }
      if(white === 5) {
        setWinner(()=> 'white')
        break}
      if(black === 5){
        setWinner(() => 'black')
        break
      
      
    }
    
    }}
}
const checkVerticalPosibility = (white, black, newBoard, f, s, t) => {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++){
      white = 0
      black = 0
      if(newBoard[i+f][j+t] === 'white' && newBoard[i+f][j+3+t] === 'white'){
        white+=2

      }
      else if(newBoard[i+f][j+t] === 'black' && newBoard[i+f][j+3+t] === 'black'){
        black+=2

      }
      else continue
      for (let k = 0; k < 3; k++){
        if(newBoard[i+s][j+3*k] === 'white') white++
        if(newBoard[i+s][j+3*k] === 'black') black++
      }
      if(white === 5) {
        setWinner('white')
        break}
      if(black === 5){
        setWinner('black')
        break

    }
  }
}}
const checkDiagonally = (newBoard) => {
  const checkConditionForColor = color =>{
    if (newBoard[0][1] === color && newBoard[0][5] === color && newBoard[1][6] === color && newBoard[3][1] === color && newBoard[3][5] === color)
    setWinner(color)
    else if (newBoard[0][0] === color && newBoard[0][4] === color && newBoard[0][8] === color && newBoard[3][0] === color && newBoard[3][4] === color)
    setWinner(color)
    else if (newBoard[0][4] === color && newBoard[0][8] === color && newBoard[3][0] === color && newBoard[3][4] === color && newBoard[3][8] === color )
    setWinner(color)
    else if(newBoard[0][3] === color && newBoard[0][7] === color && newBoard[2][2] === color && newBoard[3][3] === color && newBoard[3][7] === color)
    setWinner(color)
    else if (newBoard[1][2] === color && newBoard[1][4] === color && newBoard[1][6] === color && newBoard[2][2] === color && newBoard[2][4] === color)
    setWinner(color)
    else if (newBoard[1][4] === color && newBoard[1][6] === color && newBoard[2][2] === color && newBoard[2][4] === color && newBoard[2][6] === color)
    setWinner(color)
    else if (newBoard[1][1] === color && newBoard[1][3] === color && newBoard[0][8] === color && newBoard[2][1] === color && newBoard[2][3] === color )
    setWinner(color)
    else if(newBoard[1][5] === color && newBoard[1][7] === color && newBoard[3][0] === color && newBoard[2][5] === color && newBoard[2][7] === color)
    setWinner(color)
  }
  checkConditionForColor('white')
  checkConditionForColor('black')
}
const RotateBoard = (newBoard, num) => {
  if(winner) return
  let newBoard2 = []
  newBoard2.push(newBoard[num][6], newBoard[num][3], newBoard[num][0], newBoard[num][7], newBoard[num][4], newBoard[num][1], newBoard[num][8], newBoard[num][5], newBoard[num][2])
  newBoard[num] = newBoard2
  setBoard(newBoard)
  checkForWinner()
}
const RotateBoardRev = (newBoard, num) => {
  if(winner) return
  let newBoard2 = []
  newBoard2.push(newBoard[num][2], newBoard[num][5], newBoard[num][8], newBoard[num][1], newBoard[num][4], newBoard[num][7], newBoard[num][0], newBoard[num][3], newBoard[num][6])
  newBoard[num] = newBoard2
  setBoard(newBoard)
  checkForWinner()
}
const RotateTurn = (newBoard) => {
  
  setBoardToRotate(window.prompt("Select board to rotate (1-4)"))
  while(boardToRotate > 4 && boardToRotate < 0) setBoardToRotate(window.prompt("Select board to rotate (1-4)"))
  setChoice(window.prompt("Which board to rotate\n 1 - clocwise\n 2 - counterclockwise"))
  // while(choice >=1 && choice <= 2) setChoice(window.prompt("Which board to rotate\n 1 - clocwise\n 2 - counterclockwise"))

  if (choice-1 === 0) {
        // RotateBoard(newBoard, boardIndex)
        // boardNr.classList.add('animRight')
        
        RotateBoard(newBoard, boardToRotate-1)
      
      
  } 
  else if (choice-1 === 1) {
        // RotateBoardRev(newBoard, boardIndex)
        // boardNr.classList.add('animLeft')
        RotateBoardRev(newBoard, boardToRotate-1)
        
      
  }

}


  return (
    <div className="App">
      <h1>Pentago
        <button onClick={() => {setInfoPanelVisible(false)}} className="info-btn">ⓘ</button>
      </h1>
      {infoPanelVisible ? "" : 
      (
        <div className="info-panel"> 
          <button onClick={() => {setInfoPanelVisible(true)}} className="close-panel">❌</button>
          <h3>Tutorial</h3>
          <p>Goal of the game:</p>
          <p>- Place 5 balls vertically, horizontally or diagonally to win.</p>
          <p>- Each round, one of the four smaller boards rotates randomly.</p>
        </div>
      )
      }
      {winner ? <><h2>Winner is {winner}</h2> <span className="restart"  onClick={() => ResetBoard()} >Restart</span> </> : fullBoard ? <h2 className="restart"  onClick={() => ResetBoard()} >Restart</h2> :<h2>Now it's <span style={{color:'#a4161a'}}>{turn} </span>turn</h2>}
      <div className="board">
        {board.map((row, index) => {
          return (
            <InBoard key={index}  board={row} row={index} turn={turn} changeColor={changeColor} choice={choice} />
            )})}

        </div>
    </div>
  );
}

export default App;
