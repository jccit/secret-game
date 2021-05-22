import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, CircularProgress } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { connect } from "../redux/reducers/socket";
import LoadingButton from './LoadingButton';

const ConnectButtons = () => {
  const socketConnection = useAppSelector((state) => state.socket.connection);
  const dispatch = useAppDispatch();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [lastClicked, setLastClicked] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const joinRoom = (room: string) => {
    dispatch(connect({ room, name }));
  }

  const joinClick = () => {
    setLastClicked(1);
    joinRoom(code);
  }

  const createRoom = () => {
    setLastClicked(0);
    joinRoom('');
  }

  const nameInvalid = name == "";
  const connecting = socketConnection === 'connecting';
  const joinConnecting = lastClicked === 1 && connecting;
  const createConnecting = lastClicked === 0 && connecting;
  const validCode = code.length == 6;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
      <TextField
        variant="outlined"
        label="Username"
        value={name}
        onChange={handleNameChange}
        disabled={connecting}
      />

      <TextField
        variant="outlined"
        label="Join existing game"
        placeholder="Game code"
        style={{marginTop: 50}}
        value={code}
        disabled={connecting || nameInvalid}
        onChange={handleChange}
        inputProps={{ maxLength: 6 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {
                joinConnecting ? <CircularProgress size={24} /> :
                <IconButton
                  onClick={joinClick}
                  disabled={connecting || !validCode || nameInvalid}
                  edge="end"
                >
                  <Send />
                </IconButton>
              }
            </InputAdornment>
          )
        }}
      />

      <LoadingButton 
        loading={createConnecting} 
        variant="outlined"
        color="primary"
        size="large"
        onClick={createRoom}
        disabled={connecting || nameInvalid}
        style={{marginTop: 30}}
      >Start new game</LoadingButton>
    </div>
  );
};

export default ConnectButtons;