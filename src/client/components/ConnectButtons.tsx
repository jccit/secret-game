import React from 'react';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { connect } from "../redux/reducers/socket";

const ConnectButtons = () => {
  const socketConnection = useAppSelector((state) => state.socket.connection);
  const dispatch = useAppDispatch();

  const joinRoom = (room: string) => {
    dispatch(connect(room));
  }

  const createRoom = () => {
    joinRoom('');
  }

  const connecting = socketConnection === 'connecting';

  return (
    <button onClick={createRoom} disabled={connecting}>Create room</button>
  );
};

export default ConnectButtons;