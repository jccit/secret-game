import React from 'react';
import { useAppSelector } from '../redux/hooks';
import type { PlayerList } from '../../shared/types/Player';

const PlayerList = () => {
  const players: PlayerList = useAppSelector((state) => state.game.players);

  return (
    <ul>
      { Object.keys(players).map((id, i) => {
        return <li key={i}>{ players[id].name }</li>
      }) }
    </ul>
  )
};

export default PlayerList;