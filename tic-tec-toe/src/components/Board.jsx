import React, { useState } from "react";
import "./Board.css";
import Square from "./Square";

function Board() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  let drawIndicate = false;

  const checkWinner = () => {
    const condition = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let logic of condition) {
      const [a, b, c] = logic;
      if (board[a] !== null && board[a] === board[b] && board[b] === board[c]) {
        return board[a];
      }
    }
    return false;
  };

  const checkDraw = (board) => {
    let count = 0;
    board.forEach((element) => {
      if (element !== null) {
        count++;
      }
    });

    if (count >= 9) {
      return true;
    } else {
      return false;
    }
  };

  let result;
  var winner = checkWinner();
  if (winner) {
    result = winner;
  }

  let draw = checkDraw(board);
  if (draw) {
    result = "Match Drawn";
    drawIndicate = true;
  }

  const handleClick = (i) => {
    if (board[i] !== null) {
      return;
    }
    let squareVal = [...board];
    squareVal[i] = isXTurn ? "X" : "O";
    setBoard(squareVal);
    setIsXTurn(!isXTurn);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="main">
      <div className="container">
        {result ? (
          drawIndicate ? (
            <>
              <h1 className="winner-heading">Opps!!! Match Drawn</h1>
              <button onClick={handleReset}>Play Again</button>
            </>
          ) : (
            <>
              <h1 className="winner-heading">Player {result} won the match</h1>
              <button onClick={handleReset}>Play Again</button>
            </>
          )
        ) : (
          <>
            <h1 style={{ marginLeft: "2rem", marginBottom: "2rem" }}>
              Tic-Tac-Toe Game
            </h1>
            <h3 className="move">Player {isXTurn ? "X" : "O"} please move</h3>
            <div className="board-row">
              <Square onClick={() => handleClick(0)} value={board[0]} />
              <Square onClick={() => handleClick(1)} value={board[1]} />
              <Square onClick={() => handleClick(2)} value={board[2]} />
            </div>
            <div className="board-row">
              <Square onClick={() => handleClick(3)} value={board[3]} />
              <Square onClick={() => handleClick(4)} value={board[4]} />
              <Square onClick={() => handleClick(5)} value={board[5]} />
            </div>
            <div className="board-row">
              <Square onClick={() => handleClick(6)} value={board[6]} />
              <Square onClick={() => handleClick(7)} value={board[7]} />
              <Square onClick={() => handleClick(8)} value={board[8]} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Board;
