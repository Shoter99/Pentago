import React from 'react'
import Place from './Place'
const InBoard = ({board, turn, row, changeColor, choice}) => {
    
    return (
        <div className={`inBoard ${choice}`} id={`boardnr_`+row}>
            {/* {console.log('Row: '+row)} */}
            {board.map((place, index) => {
        return (
            <Place changeColor={changeColor} color={place} row={row} col={index} turn={turn} />
        )
    })}
        
        
        </div>
    )
}

export default InBoard
