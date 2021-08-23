import { Card } from "@material-ui/core";
import { AccountBox, HelpOutline, Person, PersonOutline, Star, StarHalf, ThumbDown, ThumbsUpDown, ThumbUp } from "@material-ui/icons";
import React from "react";
import GameState from "../../shared/types/GameState";
import { PlayerState } from "../../shared/types/Player";
import Role from "../../shared/types/Role";
import { Vote } from "../../shared/types/Vote";

const Player = (props: { G: GameState , player: PlayerState, playerID: string, select: (pid: string) => void }) => {
  const { player } = props;

  let RoleIcon = HelpOutline;

  switch (player.role) {
    case Role.Evil:
      RoleIcon = StarHalf;
      break;

    case Role.Leader:
      RoleIcon = Star;
      break;

    default:
      break;
  }

  let ElectedIcon = null;
  if (props.G.president === player.id) {
    ElectedIcon = AccountBox;
  }
  if (props.G.chancellor === player.id) {
    ElectedIcon = Person;
  }
  if (props.G.chancellorCandidate === player.id) {
    ElectedIcon = PersonOutline;
  }

  let VoteIcon = null;
  if (props.G.votes.hasOwnProperty(player.id)) {
    VoteIcon = ThumbsUpDown;

    const vote = props.G.votes[player.id];
    if (vote === Vote.Yes) {
      VoteIcon = ThumbUp;
    } else if (vote === Vote.No) {
      VoteIcon = ThumbDown;
    }
  }

  const select = () => {
    props.select(player.id);
  }

  return (
    <Card onClick={select} raised={player.id === props.playerID}>
      <p>PID: {player.id}</p>
      {VoteIcon ? <VoteIcon /> : null}
      {ElectedIcon ? <ElectedIcon /> : null}
      <RoleIcon htmlColor={player.role >= Role.Evil ? "red" : "black"} />
    </Card>
  );
}

export default Player;