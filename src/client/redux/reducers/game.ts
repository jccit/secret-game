import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type Game from 'shared/types/Player';

const initialState: Game = {
  id: '',
  players: [],
  joinState: "inactive"
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    joined: (state: Game, action: PayloadAction<Game>) => {
      return {
        ...state,
        ...action.payload,
        joinState: "joined"
      };
    },
    joiningFail: (state: Game) => {
      state.joinState = "failed";
    },
    playerJoined: (state: Game, action: PayloadAction<string>) => {
      state.players.push({ name: action.payload });
    }
  },
})

// Action creators are generated for each case reducer function
// export const { } = gameSlice.actions

export default gameSlice.reducer