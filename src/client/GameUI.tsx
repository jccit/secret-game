import React from 'react';
import { BoardProps } from 'boardgame.io/dist/types/packages/react';
import GameState from '../shared/types/GameState';
import Lobby from './components/Lobby';

export const GameUI = (props: BoardProps<GameState>) => {
  let PhaseComponent: any = 'div';

  switch (props.ctx.phase) {
    case 'lobby':
      PhaseComponent = Lobby;
      break;
  
    default:
      break;
  }

  return (
    <>
      <h1>Game</h1>
      <PhaseComponent {...props} />
    </>
  );
};

export default GameUI;