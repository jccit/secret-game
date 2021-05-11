import type Player from './Player.ts'

export default interface Game {
  id: string;
  players: Player[];
  joinState?: "inactive" | "joined" | "failed";
}