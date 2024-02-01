import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "authSlice",
  initialState: { isAuthenticated: false } as { isAuthenticated: boolean },
  reducers: {
    changeAuthenticationStatus: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isAuthenticated = payload
    },
  },
})

export const { changeAuthenticationStatus } = authSlice.actions

export default authSlice.reducer
