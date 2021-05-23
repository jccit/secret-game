import React from 'react';
import PlayerList from './components/PlayerList';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { vote } from './redux/reducers/player';

export default function Game() {
  const gameId = useAppSelector((state) => state.game.id);
  const dispatch = useAppDispatch();

  return (
    <>
      <h1>Game {gameId}</h1>
      <button onClick={() => dispatch(vote(true))}>Vote</button>
      <PlayerList />
    </>
  )
}