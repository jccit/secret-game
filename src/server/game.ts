import type GameState from "../shared/types/GameState.ts";
import type Player from "../shared/types/Player.ts";
import Role from "../shared/types/Role.ts";
import { WebSocket } from "https://deno.land/std/ws/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts"
import { Phase } from "../shared/types/GameState.ts";
import player from "src/client/redux/reducers/player";

export default class Game {
  private state: GameState;
  private playerSockets: Map<string, WebSocket>;

  constructor(id: string) {
    this.state = {
      id,
      players: {},
      phase: Phase.Waiting,
      chancellor: '',
      president: '',
    };

    this.playerSockets = new Map<string, WebSocket>();
  }

  addPlayer(name: string, socket: WebSocket): string {
    const id = v4.generate();
    const cleanedName = name.replace(/\s+/g,' ').trim();
    const newPlayer: Player = {
      name: cleanedName,
      role: Role.Unknown,
      ready: false,
      voted: false,
      voteResult: undefined
    };

    socket.send(JSON.stringify({
      type: 'player/sync',
      payload: {
        ...newPlayer,
        id,
        voted: false,
        ready: false
      }
    }));

    this.playerSockets.forEach((sock: WebSocket) => {
      sock.send(JSON.stringify({
        type: 'game/playerJoined',
        payload: {
          id,
          player: newPlayer,
          voted: false,
          ready: false
        }
      }));
    });

    this.state.players[id] = newPlayer;
    this.playerSockets.set(id, socket);

    return id;
  }

  removePlayer(playerId: string) {
    delete this.state.players[playerId];
    this.playerSockets.delete(playerId);

    this.playerSockets.forEach((sock: WebSocket) => {
      sock.send(JSON.stringify({
        type: 'game/playerLeft',
        payload: playerId
      }));
    });
  }

  getId(): string {
    return this.state.id;
  }

  getState(): GameState {
    return this.state;
  }

  filterState(playerId?: string): GameState {
    const playerRole: Role = this.state.players[playerId || '']?.role ?? Role.Unknown;
    const filtered: GameState = JSON.parse(JSON.stringify(this.state));

    for (const id in filtered.players) {
      if (filtered.phase != Phase.ElectionResults) {
        filtered.players[id].voteResult = undefined;
      }

      if (playerRole != Role.Evil && playerRole != Role.Leader) {
        filtered.players[id].role = Role.Unknown;
      }
    }

    return filtered;
  }

  sync(initiator?: string) {
    this.playerSockets.forEach((sock: WebSocket, id: string) => {
      if (id != initiator) {
        sock.send(JSON.stringify({
          type: 'game/sync',
          payload: this.filterState(id)
        }));
      }
    });
  }

  processEvent(action: any, playerId: string) {
    switch (action.type) {
      case 'player/ready':
        this.ready(playerId);
        break;

      case 'player/vote':
        this.voted(playerId, action.payload);
        break;
    
      default:
        break;
    }
  }

  ready(player: string) {
    if (this.state.phase == Phase.Waiting) {
      this.state.players[player].ready = true;

      // If all ready, move to game
      let playersLeft = false;
      for (const id in this.state.players) {
        const player = this.state.players[id];
        if (!player.ready) {
          playersLeft = true;
          break;
        }
      }

      if (!playersLeft) {
        this.state.phase = Phase.Setup;
        setTimeout(() => this.setup(), 2000);
      }

      this.sync();
    }
  }

  setup() {
    // Pick evil players and leader

    this.sync();
  }

  voted(player: string, vote: boolean) {
    if (this.state.phase == Phase.Election) {
      this.state.players[player].voted = true;
      this.state.players[player].voteResult = vote;

      // If all voted, move to results
      let votesLeft = false;
      for (const id in this.state.players) {
        const player = this.state.players[id];
        if (!player.voted) {
          votesLeft = true;
          break;
        }
      }

      if (!votesLeft) {
        this.state.phase = Phase.ElectionResults;
      }

      this.sync();
    }
  }
}