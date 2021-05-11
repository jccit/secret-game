import { configureStore } from '@reduxjs/toolkit'
import game from './reducers/game'
import player from './reducers/player'
import socket from './reducers/socket'
import ws from './websocket'

export const store = configureStore({
  reducer: {
    game,
    player,
    socket
  },
  middleware: [ws]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch