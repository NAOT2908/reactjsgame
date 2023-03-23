import React, { useEffect, useState } from 'react'
import "./Squares.css";


export default function Square({ rows, cols, winvalue }) {
  const inputRows = Number(rows);
  const inputCols = Number(cols);

  const [square, setSquare] = useState([]);
  const [winner, setWinner] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState('X');

  // khởi tạo lịch sử
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(0)

  // khởi tạo giá trị cho square khi rows và cols thay đổi vì khi khởi tạo biến square chưa chứa được giá trị mới nhất nên nó sẽ rỗng
  useEffect(() => {
    setSquare(Array(inputRows).fill("").map((item) => Array(inputCols).fill("")))
  }, [inputRows, inputCols]) // phụ thuộc vào hàng và cột được nhập vào, gọi 1 lần

  const handleClick = (i, j) => {
    const currentValue = square[i][j]
    if (currentValue === "X" || currentValue === "O") {
      return;
    }
    console.log(square)
    const newSquare = [...square];
    newSquare[i][j] = currentPlayer;
    setSquare(newSquare);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

    const newHistory = [...history]
    newHistory.push([i, j]);
    setHistory(newHistory);
    console.log(newHistory)
    setCurrentStep(newHistory.length)

    if (playerHasWon(i, j)) {

      alert(`${square[i][j]} đã chiến thắng`)

      return
    } else if (checkTie()) {
      return
    }

  };


  function playerHasWon(i, j) {
    // Check rows
    let pickxo = square[i][j]
    let winning_blocks = [];

    let scRows = 1;
    let afterRow = j + 1;
    let beforeRow = j - 1;

    while (pickxo === square[i][afterRow] && afterRow < inputCols) {
      scRows++;
      afterRow++;

    }
    while (pickxo === square[i][beforeRow] && beforeRow >= 0) {
      scRows++;
      beforeRow--;

    }
    if (scRows >= winvalue) {
      for (let k = beforeRow + 1; k < afterRow; k++) {
        winning_blocks.push([i, k]);
      }
      setWinner(winning_blocks)
      return true
    }
    // check cột
    let scCols = 1;
    let upCol = i - 1;
    let downCol = i + 1;
    while (upCol >= 0 && pickxo === square[upCol][j]) {
      scCols++;
      upCol--;
    }
    while (downCol < inputRows && pickxo === square[downCol][j]) {
      scCols++;
      downCol++;
    }
    if (scCols >= winvalue) {
      for (let k = upCol + 1; k < downCol; k++) {
        winning_blocks.push([k, j])

      }
      setWinner(winning_blocks)

      return true
    }
    // checkwin hàng chéo diagonalLTR (left to right)

    let scDiagonal1 = 1;
    let upDiag1 = i - 1;
    let leftDiag1 = j - 1;
    let newarr = [[i, j]];
    while (upDiag1 >= 0 && leftDiag1 >= 0 && pickxo === square[upDiag1][leftDiag1]) {
      scDiagonal1++;
      newarr.push([upDiag1, leftDiag1]);
      upDiag1--;
      leftDiag1--;
      console.log(newarr);
    }
    let downDiag1 = i + 1;
    let rightDiag1 = j + 1;
    while (downDiag1 < inputRows && rightDiag1 < inputCols && pickxo === square[downDiag1][rightDiag1]) {
      scDiagonal1++;
      newarr.push([downDiag1, rightDiag1]);
      downDiag1++;
      rightDiag1++;
    }
    if (scDiagonal1 >= winvalue) {
      setWinner(newarr)
      return true
    }

    // check hàng chéo diagnalRTL (right to left)
    let scDiagonal2 = 1;
    let upDiag2 = i - 1;
    let rightDiag2 = j + 1;
    let newarr2 = [[i, j]];
    // chéo dưới lên 
    while (upDiag2 >= 0 && rightDiag2 < inputCols && pickxo === square[upDiag2][rightDiag2]) {
      scDiagonal2++;
      newarr2.push([upDiag2, rightDiag2])
      upDiag2--;
      rightDiag2++;
    }
    // chéo trên xuống
    let downDiag2 = i + 1;
    let leftDiag2 = j - 1;

    while (downDiag2 < inputCols && leftDiag2 >= 0 && pickxo === square[downDiag2][leftDiag2]) {
      scDiagonal2++;
      newarr2.push([downDiag2, leftDiag2])
      downDiag2++;
      leftDiag2--;
    }
    if (scDiagonal2 >= winvalue) {

      setWinner(newarr2)
      return true
    }
  }
  function checkTie() {
    for (let i = 0; i < inputRows; i++) {
      for (let j = 0; j < inputCols; j++) {
        if (square[i][j] === '') {
          return false;
        }
      }
    }
    // restart()

    // playText.innerHTML = 'Không có ai chiến thắng';
    alert('Không có ai chiến thắng');
    return true;
  }

  return (
    <div className='gameboard'>
      <div className='board'>
        {square.map((row, i) => {
          return (
            <div key={i} className="square-row">
              {row.map((col, j) => {
                const isWinner = winner && winner.some(([row, col]) => row === i && col === j);
                return (
                  <button key={`${i}-${j}`}
                    className={`square ${isWinner ? 'winner' : ''}`}
                    onClick={() => handleClick(i, j)}>
                    {col}
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>

      <div className='history'>
        <ol>
          {history.map(([row, col], index) => {
            const fontWeight = index === currentStep - 1 ?  'bold' : 'normal';
            const positions = `Vị trí ${index + 1}: (hàng ${row + 1}, cột ${col + 1})`;
            return (
              <li key={index} style={{fontWeight}} 
              onClick={() =>  setCurrentStep(index + 1)
              } 
              >
                {positions}
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  );


}
