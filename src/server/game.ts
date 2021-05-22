import type GameState from "../shared/types/GameState.ts";
import type Player from "../shared/types/Player.ts";
import Role from "../shared/types/Role.ts";
import { WebSocket } from "https://deno.land/std/ws/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts"

export default class Game {
  private state: GameState;
  private playerSockets: Map<string, WebSocket>;

  constructor() {
    this.state = {
      id: '123456',
      players: {}
    };

    this.playerSockets = new Map<string, WebSocket>();
  }

  addPlayer(name: string, socket: WebSocket): string {
    const id = v4.generate();
    const cleanedName = name.replace(/\s+/g,' ').trim();
    const newPlayer: Player = {
      name: cleanedName,
      role: Role.Unknown
    };

    socket.send(JSON.stringify({
      type: 'player/sync',
      payload: {
        ...newPlayer,
        id
      }
    }));

    this.playerSockets.forEach((sock: WebSocket) => {
      sock.send(JSON.stringify({
        type: 'game/playerJoined',
        payload: {
          id,
          player: newPlayer
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
}