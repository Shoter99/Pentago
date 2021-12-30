import React from 'react'
import {useState} from 'react'
const Place = ({color, row, col, changeColor}) => {
    return (
        <div className={`place ${color}`} onClick={() => changeColor(row, col)}>
        {row +" "+ col}
        </div>
    )
}

export default Place
