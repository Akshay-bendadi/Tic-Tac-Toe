import { useState } from "react";
import GameBoard from "./Components/GameBoard.jsx";
import Player from "./Components/Player";
import { WINNING_COMBINATIONS } from "./Winning-combination.js";
import GameOver from "./Components/GameOver.jsx";
import "./App.css";
const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};
const InITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function DerivegameBoard(GameTurn) {
  let gameboard = [...InITIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of GameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameboard[row][col] = player;
  }
  return gameboard;
}
function DeriveWinner(gameboard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameboard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameboard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameboard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}
function deriveActivePlayer(GameTurn) {
  let currentPlayer = "X";
  if (GameTurn.length > 0 && GameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

export default function App() {
  const [GameTurn, SetGameTurn] = useState([]);
  const [players, Setplayer] = useState(PLAYERS);
  const activePlayer = deriveActivePlayer(GameTurn);
  const gameboard = DerivegameBoard(GameTurn);
  const winner = DeriveWinner(gameboard, players);
  const hasDraw = GameTurn.length === 9 && !winner;
  function handleSelectSquare(rowIndex, colIndex) {
    SetGameTurn((preTurn) => {
      const currentPlayer = deriveActivePlayer(preTurn);

      const updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...preTurn,
      ];
      return updatedTurn;
    });
  }

  function HandleRestart() {
    SetGameTurn([]);
  }

  function HandlePlayerNameChange(symbol, Newname) {
    Setplayer((prePlayers) => {
      return {
        ...prePlayers,
        [symbol]: Newname,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            Playername={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            Playername={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} restart={HandleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameboard} />
      </div>
    </main>
  );
}
  