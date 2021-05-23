import type Role from './Role.ts';

export default interface Player {
  id?: string;
  name: string;
  role: Role;
  ready: boolean;
  voted: boolean;
  voteResult?: boolean;
}

export type PlayerList = { [id: string]: Player };