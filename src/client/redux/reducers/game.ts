import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type Player from 'shared/types/Player';

interface GameState {
  players: Player[];
}

const initialState: GameState = {
  players: []
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
  },
})

// Action creators are generated for each case reducer function
// export const { } = gameSlice.actions

export default gameSlice.reducer