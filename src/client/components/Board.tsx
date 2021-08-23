import React from "react";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import GameState from "../../shared/types/GameState";
import { PlayerState } from "../../shared/types/Player";
import Cards from "./Cards";
import Player from "./Player";
import { Grid } from "@material-ui/core";
import Vote from "./Vote";

const Board = (props: BoardProps<GameState>) => {
  let stage = '';

  if (props.ctx.activePlayers && props.ctx.activePlayers.hasOwnProperty(props.playerID)) {
    stage = props.ctx.activePlayers[props.playerID];
  }

  const selectPlayer = (pid: string) => {
    if (stage === 'selectChancellor') {
      props.moves.selectChancellor(pid);
    }

    console.log(pid);
  }

  return (
    <>
      {stage ? <p>{stage}</p> : null}
      <Grid container>
        {Object.values(props.G.players).map((player: PlayerState, key: number) => {
          if (!player.disabled) {
            return (
              <Grid item xs={2}>
                <Player G={props.G} key={key} player={player} playerID={props.playerID} select={selectPlayer} />
              </Grid>
            );
          }

          return null;
        })}
      </Grid>
      {stage === 'vote' ? <Vote {...props} /> : null}
      <Cards {...props} />
    </>
  );
}

export default Board;