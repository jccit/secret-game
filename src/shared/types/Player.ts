import { Ctx } from 'boardgame.io';
import Card from './Card';
import GameState from './GameState';
import Role from './Role';

export interface PlayerState {
  id: string;
  role: Role;
  disabled: boolean;
  voted: boolean;
  voteResult?: boolean;
  cards: Card[];
}

export const setupPlayer = (id: string): PlayerState => ({
  id,
  role: Role.Unknown,
  disabled: false,
  voted: false,
  cards: []
});

export const filterPlayerData = (G: GameState, ctx: Ctx, playerID: string): GameState => {
  const players = Object.keys(G.players).map((id: string) => {
    const player = G.players[id];
    if (player.id === playerID) return player;

    return {
      ...player,
      cards: []
    };
  });

  return {
    ...G
  };
};
