import React from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { connect } from './redux/reducers/socket';

export default function Game() {
  const status = useAppSelector((state) => state.socket.connection);
  const dispatch = useAppDispatch();

  const tryConnect = () => {
    dispatch(connect('ws://localhost:8090'));
  }

  return (
    <>
      <h1>Hello world!</h1>
      <button onClick={tryConnect} disabled={status === 'connecting'}>{status}</button>
    </>
  );
}