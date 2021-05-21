import type { PlayerList } from './Player.ts';
import type Player from './Player.ts'

export default interface GameState {
  id: string;
  players: PlayerList;
  joinState?: "inactive" | "joined" | "failed";
}