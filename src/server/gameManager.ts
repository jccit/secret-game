import Game from './game.ts';
import { WebSocket } from "https://deno.land/std/ws/mod.ts";

export default class GameManager {
  private games: Map<string, Game>;
  private players: Map<string, { game: string, player: string }>; // Stores socket id => player id

  constructor() {
    this.games = new Map<string, Game>();
    this.players = new Map<string, { game: string, player: string }>();
  }

  get(id: string): Game | null {
    if (this.games.has(id)) {
      const game = this.games.get(id);
      if (game) {
        return game;
      }
    }

    return null;
  }

  static generateID(): string {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  }

  newGame(): Game {
    let id = GameManager.generateID();
    
    while (this.games.has(id)) {
      id = GameManager.generateID();
    }

    const game = new Game(id);
    this.games.set(id, game);
    return game;
  }

  joinGame(gameId: string, socketId: string, socket: WebSocket, name: string) {
    const game = this.games.get(gameId);
    if (game) {
      const playerId = game.addPlayer(name, socket);
      this.players.set(socketId, {game: gameId, player: playerId});
    }
  }

  disconnect(socketId: string) {
    const playerData = this.players.get(socketId);

    if (playerData) {
      const game = this.games.get(playerData.game);

      if (game) {
        game.removePlayer(playerData.player);
      }
    }

    this.players.delete(socketId);
  }
}