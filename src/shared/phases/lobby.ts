import { PhaseConfig, Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import GameState from "../types/GameState";
import Role from "../types/Role";

export const readyCheck = (G: GameState, ctx: Ctx): boolean => {
  let validPlayers = 1;
  for (const player in G.players) {
    if (ctx.activePlayers[player] === 'ready')
      validPlayers++;
  }

  return validPlayers >= 5;
}

export const lobby: PhaseConfig = {
  start: true,
  next: 'election',
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
            if (!readyCheck(G, ctx)) {
              return INVALID_MOVE;
            }

            // Disable anyone still connecting
            for (const player in G.players) {
              const state = ctx.activePlayers[player];
              G.players[player].disabled = state === 'waiting';
            }

            // Set turn order before starting game
            let validPlayers = [];
            for (const player in G.players) {
              if (!G.players[player].disabled)
                validPlayers.push(player);
            }

            G.turnOrder = ctx.random.Shuffle(validPlayers);

            ctx.events.endPhase();
          }
        }
      }
    }
  },
  onEnd: (G: GameState, ctx: Ctx) => {
    // Assign roles

    // Evil count is set based on player count
    // 1E+L: 5-6 players
    // 2E+L: 7-8 players
    // 3E+L: 9-10 players
    // This works out to be about 40% of the player count
    // We'll implement this using a percentage so we can scale to large player counts in future
    const evilCount = Math.round(G.turnOrder.length / 100 * 40);
    const evilIDs = ctx.random.Shuffle(G.turnOrder).slice(0, evilCount);

    for (const eid of evilIDs) {
      G.players[eid].cards.push({ name: 'evil' });
      G.players[eid].role = Role.Evil;
    }

    const leaderIdx = ctx.random.Die(evilCount);
    const leaderID = evilIDs[leaderIdx - 1];
    G.players[leaderID].cards.push({ name: 'leader' });
    G.players[leaderID].role = Role.Leader;

    const goodIDs = G.turnOrder.filter((pid: string) => !evilIDs.includes(pid));
    for (const gid of goodIDs) {
      G.players[gid].cards.push({ name: 'good' });
      G.players[gid].role = Role.Good;
    }
  }
};