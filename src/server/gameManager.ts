import type Game from "../shared/types/Game.ts";

export default class GameManager {
  private games: Map<string, Game>;

  constructor() {
    this.games = new Map<string, Game>();
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

  newGame(): Game {
    const game: Game = {
      id: '123456',
      players: []
    };

    this.games.set(game.id, game);
    return game;
  }
}