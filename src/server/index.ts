import { Server, Origins } from "boardgame.io/server";
import { SecretGame } from '../shared/Game';

const server = Server({
  games: [SecretGame],
  origins: [Origins.LOCALHOST],
});

server.run(8000);