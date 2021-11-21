import React from 'react'
import Place from './Place'
const InBoard = ({board, turn, row, changeColor}) => {
    
    return (
        <div className='inBoard'>
        
            {board.map((place, index) => {
        return (
            <Place changeColor={changeColor} color={place} row={row} col={index} turn={turn} />
        )
    })}
        
        
        </div>
    )
}

export default InBoard
