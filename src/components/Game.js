import React from 'react'
import Square from './Squares'
import "./GameStyle.css";
import { useState } from 'react';

export default function Game() {
  const [rows, setRows] = useState("")
  const [cols, setCols] = useState("")
  const [winvalue, setWinvalue] = useState("")
  const [playstate, setPlaystate] = useState(false)
  const [key, setKey] = useState(0)

  const handlePlayClick = () => {
    if (!playstate) { setPlaystate(true) }
    return (
      <div>
      </div>
    )
  }
  const handleRestart = () => {
    if (!playstate) { setPlaystate(true) }
    setKey(key + 1) // đặt lại trạng thái mới
  }

  return (
    <div className="info">
      <h2 className='playerText' >GAME TIC TAC </h2>
      <div className="ongame">

        <label htmlFor="iprows" className="lrow">Nhập số hàng :</label>
        <input type="text" onChange={(e) => setRows(e.target.value)} /> <br />

        <label htmlFor="ipcols" className="lcol">Nhập số cột :</label>
        <input type="text" onChange={(e) => setCols(e.target.value)} /> <br />


        <label htmlFor="ipvalue" className="lvalue">Nhập loại chơi :</label>
        <input type="text"  onChange={(e) => setWinvalue(e.target.value)} /> <br />

        <button className="btnplay" onClick={handlePlayClick}>Play</button>
        <button className="btnrestart" onClick={handleRestart}>Restart</button>
      </div>

      <div className='boardgame'>
        {playstate && < Square key={key} rows={rows} cols={cols} winvalue={winvalue} />}
      </div>
      
    </div>
  )
}
