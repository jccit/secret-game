import { serve } from "https://deno.land/std/http/server.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  WebSocket,
} from "https://deno.land/std/ws/mod.ts";
import type Game from '../shared/types/Game.ts';
import Role from '../shared/types/Role.ts';
import GameManager from './gameManager.ts';

const gm = new GameManager();

function handleReduxEvent(sock: WebSocket, rawAction: string) {
  const action = JSON.parse(rawAction);

  if (action.type === 'join') {
    let game: Game | null = null;

    if (action.payload != '') {
      game = gm.get(action.payload);
    } else {
      game = gm.newGame();
    }

    if (game) {
      sock.send(JSON.stringify({
        type: 'game/joined',
        payload: game
      }));
    } else {
      sock.send(JSON.stringify({
        type: 'game/joiningFail',
      }));
    }
  }
}

async function handleWs(sock: WebSocket) {
  console.log("socket connected!");

  try {
    for await (const ev of sock) {
      if (typeof ev === "string") {
        // text message
        console.log("ws:Text", ev);

        handleReduxEvent(sock, ev);
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
    acceptWebSocket({
      conn,
      bufReader,
      bufWriter,
      headers,
    })
      .then(handleWs)
      .catch(async (err) => {
        console.error(`failed to accept websocket: ${err}`);
        await req.respond({ status: 400 });
      });
  }
}