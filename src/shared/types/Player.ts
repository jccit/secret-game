import { Ctx } from 'boardgame.io';
import Card from './Card';
import GameState from './GameState';
import Role from './Role';
import { Vote } from './Vote';

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
  let players: Record<string, PlayerState> = {};
  const currentPlayer = G.players[playerID];
  for (const pid in G.players) {
    if (Object.prototype.hasOwnProperty.call(G.players, pid)) {
      const player = G.players[pid];
      if (player.id === currentPlayer.id) {
        players[pid] = player;
      } else {
        const showRole = currentPlayer.role >= Role.Evil;

        players[pid] = {
          ...player,
          role: showRole ? player.role : Role.Unknown,
          cards: []
        }
      }
      
    }
  }

  let votes: Record<string, Vote> = {};
  for (const playerVoteID in G.votes) {
    if (!G.showVotes && playerID !== playerVoteID) {
      votes[playerVoteID] = Vote.Unknown;
    } else {
      votes[playerVoteID] = G.votes[playerVoteID];
    }
  }

  return {
    ...G,
    players,
    votes
  };
};
