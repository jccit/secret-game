import { PhaseConfig, Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import GameState from "../types/GameState";

export const lobby: PhaseConfig = {
  start: true,
  turn: {
    activePlayers: { currentPlayer: 'admin', others: 'waiting' },
    stages: {
      waiting: {
        moves: {
          ready: (G: GameState, ctx: Ctx) => {
            ctx.events.setStage('ready');
          }
        },
      },
      ready: {},
      admin: {
        moves: {
          startGame: (G: GameState, ctx: Ctx) => {
            // Validate we have the correct number of players
            let validPlayers = 1;
            for (const player in G.players) {
              if (ctx.activePlayers[player] === 'ready')
                validPlayers++;
            }

            if (validPlayers < 5) {
              return INVALID_MOVE;
            }
            
            // Disable anyone still connecting
            for (const player in G.players) {
              const state = ctx.activePlayers[player];
              G.players[player].disabled = state === 'waiting';
            }
            ctx.events.endPhase();
          }
        }
      }
    }
  }
};