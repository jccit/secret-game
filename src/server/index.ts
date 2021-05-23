import { serve } from "https://deno.land/std/http/server.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  WebSocket,
} from "https://deno.land/std/ws/mod.ts";
import Role from '../shared/types/Role.ts';
import Game from './game.ts';
import GameManager from './gameManager.ts';

const gm = new GameManager();

function handleReduxEvent(sock: WebSocket, sockId: string, rawAction: string) {
  const action = JSON.parse(rawAction);

  if (action.type === 'join') {
    let game: Game | null = null;

    if (action.payload.room != '') {
      game = gm.get(action.payload.room);
    } else {
      game = gm.newGame();
    }

    if (game) {
      const gameId = game.getId();
      gm.joinGame(gameId, sockId, sock, action.payload.name);

      sock.send(JSON.stringify({
        type: 'game/joined',
        payload: game.getState()
      }));
    } else {
      sock.send(JSON.stringify({
        type: 'game/joiningFail',
      }));
    }
  } else {
    const game = gm.getForSocket(sockId);
    const player = gm.getPlayerID(sockId);

    if (game && player) {
      game.processEvent(action, player);
    }
  }
}

function leaveGame(sock: WebSocket, sockId: string) {
  gm.disconnect(sockId);
}

async function handleWs(sock: WebSocket, id: string) {
  console.log("socket connected!", id);

  try {
    for await (const ev of sock) {
      if (typeof ev === "string") {
        // text message
        console.log("ws:Text", ev);

        handleReduxEvent(sock, id, ev);
      } else if (ev instanceof Uint8Array) {
        // binary message
        console.log("ws:Binary", ev);
      } else if (isWebSocketPingEvent(ev)) {
        const [, body] = ev;
        // ping
        console.log("ws:Ping", body);
      } else if (isWebSocketCloseEvent(ev)) {
        // close
        const { code, reason } = ev;
        console.log("ws:Close", code, reason);

        leaveGame(sock, id);
      }
    }
  } catch (err) {
    console.error(`failed to receive frame: ${err}`);

    if (!sock.isClosed) {
      await sock.close(1000).catch(console.error);
    }
  }
}

if (import.meta.main) {
  /** websocket echo server */
  const port = 8090;
  console.log(`websocket server is running on :${port}`);
  for await (const req of serve(`:${port}`)) {
    const { conn, r: bufReader, w: bufWriter, headers } = req;
    const id = headers.get("sec-websocket-key");
    if (id) {
      acceptWebSocket({
        conn,
        bufReader,
        bufWriter,
        headers,
      })
        .then((sock) => handleWs(sock, id))
        .catch(async (err) => {
          console.error(`failed to accept websocket: ${err}`);
          await req.respond({ status: 400 });
        });
    }
  }
}