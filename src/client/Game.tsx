import React from 'react';
import PlayerList from './components/PlayerList';
import { useAppSelector } from './redux/hooks';

export default function Game() {
  const gameId = useAppSelector((state) => state.game.id);

  return (
    <>
      <h1>Game {gameId}</h1>
      <PlayerList />
    </>
  )
}