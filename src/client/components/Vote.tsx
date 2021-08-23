import React from "react";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import GameState from "../../shared/types/GameState";
import { Button, Grid } from "@material-ui/core";
import { Vote as VoteType } from '../../shared/types/Vote';

const Vote = (props: BoardProps<GameState>) => {
  return (
    <Grid container>
      <Grid item>
        <Button variant="contained" onClick={() => props.moves.vote(VoteType.Yes)}>YES</Button>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={() => props.moves.vote(VoteType.No)}>NO</Button>
      </Grid>
    </Grid>
  );
}

export default Vote;