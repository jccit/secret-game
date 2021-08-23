import React from "react";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import GameState from "../../shared/types/GameState";
import Card from "../../shared/types/Card";

const Cards = (props: BoardProps<GameState>) => {
  const cards = props.G.players[props.playerID].cards;

  return (
    <ul>
      {cards.map((card: Card, key: number) => {
        return <li key={key}>{card.name}</li>
      })}
    </ul>
  );
}

export default Cards;