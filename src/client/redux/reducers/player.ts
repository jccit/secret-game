import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Role } from 'shared/types/Role';
import type Player from 'shared/types/Player';

const initialState: Player = {
  role: Role.Unknown,
  name: 'unknown'
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setRole: (state: Player, action: PayloadAction<Role>) => {
      state.role = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setRole } = playerSlice.actions

export default playerSlice.reducer