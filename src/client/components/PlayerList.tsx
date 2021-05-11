import React from 'react';
import { useAppSelector } from '../redux/hooks';
import type Player from '../../shared/types/Player';

const PlayerList = () => {
  const players: Player[] = useAppSelector((state) => state.game.players);

  return (
    <ul>
      { players.map((player, i) => {
        return <li key={i}>{ player.name }</li>
      }) }
    </ul>
  )
};

export default PlayerList;