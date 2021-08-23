import { PlayerState } from './Player';
import { Vote } from './Vote';

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
  turnOrder: string[];
  president: string;
  chancellor: string;
  chancellorCandidate: string;
  votes: Record<string, Vote>;
  showVotes: boolean;
}