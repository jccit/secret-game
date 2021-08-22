import { PlayerState } from './Player';

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
  players: Record<string, PlayerState>;
  president: string;
  chancellor: string;
}