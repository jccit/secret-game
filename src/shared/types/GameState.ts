import type { PlayerList } from './Player.ts';
import type Player from './Player.ts'

export enum Phase {
  Waiting,
  Setup,
  NextPresident,
  Nomination,
  Election,
  ElectionResults,
  SelectingPolicy,
  ExecutiveAction
}

export default interface GameState {
  id: string;
  players: PlayerList;
  joinState?: "inactive" | "joined" | "failed";
  phase: Phase;

  president: string;
  chancellor: string;
}