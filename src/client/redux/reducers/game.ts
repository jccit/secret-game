import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import GameState, { Phase } from 'shared/types/GameState';
import type Player from 'shared/types/Player';

const initialState: GameState = {
  id: '',
  players: [],
  joinState: "inactive",
  phase: Phase.Waiting,
  chancellor: '',
  president: '',
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    joined: (state: GameState, action: PayloadAction<GameState>) => {
      return {
        ...state,
        ...action.payload,
        joinState: "joined"
      };
    },
    joiningFail: (state: GameState) => {
      state.joinState = "failed";
    },
    playerJoined: (state: GameState, action: PayloadAction<{ id: string, player: Player }>) => {
      state.players[action.payload.id] = action.payload.player;
    },
    playerLeft: (state: GameState, action: PayloadAction<string>) => {
      const players = state.players;
      delete players[action.payload];
      state.players = {...players};
    },
    sync: (state: GameState, action: PayloadAction<GameState>) => {
      return {
        ...state,
        ...action.payload
      };
    }
  },
})

// Action creators are generated for each case reducer function
// export const { } = gameSlice.actions

export default gameSlice.reducer