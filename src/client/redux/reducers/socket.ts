import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SocketState {
  connection: "disconnected" | "connecting" | "connected" | "failed";
  room: string;
}

const initialState: SocketState = {
  connection: "disconnected",
  room: ''
}

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    connect: (state: SocketState, action: PayloadAction<string>) => {
      // Actual conneciton logic is in the websocket middleware
      state.connection = "connecting";
      state.room = action.payload;
    },
    connected: (state: SocketState) => {
      state.connection = "connected";
    },
    disconnected: (state: SocketState) => {
      state.connection = "disconnected";
    }
  },
})

export const { connect, connected, disconnected } = socketSlice.actions

export default socketSlice.reducer