import { Ctx, Game } from "boardgame.io";
import GameState from "./types/GameState";
import { filterPlayerData, PlayerState, setupPlayer } from './types/Player';
import { lobby } from './phases/lobby';
import { election } from './phases/election';
import { legislative } from './phases/legislative';

export const SecretGame: Game<GameState, Ctx> = {
  name: 'secret',

  setup: (ctx: Ctx): GameState => {
    let players: Record<string, PlayerState> = {};

    for (let i = 0; i < ctx.numPlayers; i++) {
      players[i] = setupPlayer(i.toString());
    }

    return {
      players,
      turnOrder: [],
      chancellor: "",
      chancellorCandidate: "",
      president: "",
      votes: {},
      showVotes: false
    }
  },

  playerView: filterPlayerData,

  phases: {
    lobby,
    election,
    legislative
  },
};