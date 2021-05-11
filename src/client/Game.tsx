import React from 'react';
import PlayerList from './components/PlayerList';
import ConnectButtons from './components/ConnectButtons';

export default function Game() {
  return (
    <>
      <h1>Hello world!</h1>
      <ConnectButtons />
      <PlayerList />
    </>
  );
}