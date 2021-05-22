import React from 'react';
import Game from './Game';
import JoinMenu from './JoinMenu';
import { useAppSelector } from './redux/hooks';

export default function Router() {
  const joinState = useAppSelector((state) => state.game.joinState);

  if (joinState == 'joined') {
    return <Game />;
  }

  return <JoinMenu />;
}