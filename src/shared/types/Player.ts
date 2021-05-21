import type Role from './Role.ts';

export default interface Player {
  name: string;
  role: Role;
}

export type PlayerList = { [id: string]: Player };