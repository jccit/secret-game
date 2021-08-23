import React, { Suspense } from 'react';
import { BoardProps } from 'boardgame.io/dist/types/packages/react';
import GameState from '../shared/types/GameState';

const Lobby = React.lazy(() => import(/* webpackChunkName: "lobby" */'./components/Lobby'));
const Board = React.lazy(() => import(/* webpackChunkName: "board" */'./components/Board'));

export const GameUI = (props: BoardProps<GameState>) => {
  let PhaseComponent: any = 'div';

  switch (props.ctx.phase) {
    case 'lobby':
      PhaseComponent = Lobby;
      break;
  
    default:
      PhaseComponent = Board;
      break;
  }

  return (
    <>
      <h1>Game</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PhaseComponent {...props} />
      </Suspense>
    </>
  );
};

export default GameUI;