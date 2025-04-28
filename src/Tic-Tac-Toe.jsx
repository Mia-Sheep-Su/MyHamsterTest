import styles from "./TTTstyles.module.css";
import classNames from "classnames";
import { useState } from "react";
import { useEffect } from "react";

function Square({ value, onSquareClick, isFading }) {
  return (
    <div className={styles.square}>
      <button
        className={classNames(styles["btn-square"], {
          [styles["gray-square"]]: isFading,
          [styles["x-square"]]: value === "X",
          [styles["o-square"]]: value === "O",
        })}
        onClick={onSquareClick}
      >
        {value}
      </button>
    </div>
  );
}

function Board({
  xIsNext,
  squares,
  onPlay,
  xPosition,
  setxPosition,
  oPosition,
  setoPosition,
}) {
  let willDisappearIndex = null;

  if (xIsNext && xPosition.length >= 3) {
    willDisappearIndex = xPosition[0]; // X 下一步會讓這個位置消失
  } else if (!xIsNext && oPosition.length >= 3) {
    willDisappearIndex = oPosition[0]; // O 下一步會讓這個位置消失
  }

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    const nextxPosition = xPosition.slice();
    const nextoPosition = oPosition.slice();
    if (xIsNext) {
      if (xPosition.length >= 3) {
        nextSquares[nextxPosition.shift()] = null;
      }
      nextSquares[i] = "X";
      nextxPosition.push(i);
      setxPosition(nextxPosition);
      console.log("X:" + nextxPosition);
    } else {
      if (oPosition.length >= 3) {
        nextSquares[nextoPosition.shift()] = null;
      }
      nextSquares[i] = "O";
      nextoPosition.push(i);
      setoPosition(nextoPosition);
      console.log("O:" + nextoPosition);
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
    willDisappearIndex = null;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className={styles.status}>{status}</div>
      <div className={styles.board}>
        <div className={styles["board-row"]}>
          <Square
            value={squares[0]}
            onSquareClick={() => handleClick(0)}
            isFading={0 === willDisappearIndex}
          />
          <Square
            value={squares[1]}
            onSquareClick={() => handleClick(1)}
            isFading={1 === willDisappearIndex}
          />
          <Square
            value={squares[2]}
            onSquareClick={() => handleClick(2)}
            isFading={2 === willDisappearIndex}
          />
        </div>
        <div className={styles["board-row"]}>
          <Square
            value={squares[3]}
            onSquareClick={() => handleClick(3)}
            isFading={3 === willDisappearIndex}
          />
          <Square
            value={squares[4]}
            onSquareClick={() => handleClick(4)}
            isFading={4 === willDisappearIndex}
          />
          <Square
            value={squares[5]}
            onSquareClick={() => handleClick(5)}
            isFading={5 === willDisappearIndex}
          />
        </div>
        <div className={styles["board-row"]}>
          <Square
            value={squares[6]}
            onSquareClick={() => handleClick(6)}
            isFading={6 === willDisappearIndex}
          />
          <Square
            value={squares[7]}
            onSquareClick={() => handleClick(7)}
            isFading={7 === willDisappearIndex}
          />
          <Square
            value={squares[8]}
            onSquareClick={() => handleClick(8)}
            isFading={8 === willDisappearIndex}
          />
        </div>
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xPosition, setxPosition] = useState([]);
  const [oPosition, setoPosition] = useState([]);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setxPosition([]);
    setoPosition([]);
  }

  const winner = calculateWinner(currentSquares);

  // function jumpTo(nextMove) {
  //   setCurrentMove(nextMove);
  // }

  // const moves = history.map((squares, move) => {
  //   let description;
  //   if (move > 0) {
  //     description = "Go to move #" + move;
  //   } else {
  //     description = "Go to game start";
  //   }
  //   return (
  //     <li key={move}>
  //       <button onClick={() => jumpTo(move)}>{description}</button>
  //     </li>
  //   );
  // });
  useEffect(() => {
    document.body.style.backgroundColor = "#232323";

    return () => {
      document.body.style.backgroundColor = ""; // 恢復預設
    };
  }, []);

  return (
    <div className={styles.game}>
      <div className={styles["game-board"]}>
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          xPosition={xPosition}
          setxPosition={setxPosition}
          oPosition={oPosition}
          setoPosition={setoPosition}
        />
      </div>
      {/* <div className="game-info">
        <ol>{moves}</ol>
      </div> */}

      {winner && (
        <div>
          <button onClick={handleReset} className={styles["reset-button"]}>
            重新開始
          </button>
        </div>
      )}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
