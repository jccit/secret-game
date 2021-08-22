import React from 'react'
import ReactDOM from 'react-dom'
import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
// import { SocketIO } from 'boardgame.io/multiplayer';
import GameUI from './GameUI';
import { SecretGame } from '../shared/Game';

const App = Client({
  game: SecretGame,
  board: GameUI,
  multiplayer: Local(),
  numPlayers: 10
});

ReactDOM.render(
  <>
    <App playerID="0" />
    <App playerID="1" />
    <App playerID="2" />
    <App playerID="3" />
    <App playerID="4" />
  </>,
  document.getElementById('app')
);
