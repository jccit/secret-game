import React from "react";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import { readyCheck } from "../../shared/phases/lobby";
import GameState from "../../shared/types/GameState";

const Lobby = (props: BoardProps<GameState>) => {
  let btn = null;

  switch (props.ctx.activePlayers[props.playerID]) {
    case 'waiting':
      btn = <button onClick={props.moves.ready}>Ready</button>;
      break;
    case 'ready':
      btn = <button disabled>Ready</button>;
      break;
    case 'admin':
      // check if enough players are ready
      const valid = readyCheck(props.G, props.ctx);
      btn = <button disabled={!valid} onClick={props.moves.startGame}>Start game</button>;
      break;
    default:
      break;
  }

  return (
    <>
      <ul>
        {Object.keys(props.G.players).map((player, key) => {
          return <li key={key}>{player} - {props.ctx.activePlayers[player]}</li>
        })}
      </ul>
      {btn}
    </>
  );
}

export default Lobby;