import { PhaseConfig, Ctx } from "boardgame.io";
import { INVALID_MOVE, TurnOrder } from "boardgame.io/core";
import GameState from "../types/GameState";
import { Vote } from "../types/Vote";

export const election: PhaseConfig = {
  turn: {
    onBegin: (G: GameState, ctx: Ctx) => {
      G.president = ctx.currentPlayer;
    },

    order: TurnOrder.CUSTOM_FROM('turnOrder'),
    activePlayers: {
      currentPlayer: 'selectChancellor'
    },

    stages: {
      selectChancellor: {
        moves: {
          selectChancellor: (G: GameState, ctx: Ctx, id: string) => {
            if (id === G.president) {
              return INVALID_MOVE;
            }

            G.chancellorCandidate = id;
            G.votes = {};
            ctx.events.setActivePlayers({ all: 'vote' });
          }
        }
      },
      vote: {
        moves: {
          vote: {
            move: (G: GameState, ctx: Ctx, vote: Vote) => {
              G.votes[ctx.playerID] = vote;
              ctx.events.setStage('voted');

              const voted = Object.keys(G.votes).filter((pid: string) => {
                return ctx.activePlayers.hasOwnProperty(pid);
              });

              // Check if everyone has voted
              if (voted.length === Object.keys(ctx.activePlayers).length) {
                G.showVotes = true;

                // Count votes
                const count = (arr: Vote[], val: Vote) => arr.reduce((a, v) => (v === val ? a + 1: a), 0);
                const votes = Object.values(G.votes);
                const yesVotes = count(votes, Vote.Yes);
                const noVotes = count(votes, Vote.No);
                
                // TODO: Find a way to delay this by a few seconds
                if (noVotes >= yesVotes) {
                  // No winner, move to next president
                  console.log('No winner, skipping turn');
                  ctx.events.endTurn();
                } else {
                  // Winner, move to next phase
                  console.log('Winner, switch phase');
                  ctx.events.setPhase('legislative');
                }
              }
            },
            client: false
          }
        }
      },
      voted: {}
    }
  }
};