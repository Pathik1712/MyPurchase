import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import authSlice from "./auth-slice"

export const store = configureStore({
  reducer: {
    authSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export const useAppdispatch: () => typeof store.dispatch = useDispatch

export const useAppselector: TypedUseSelectorHook<RootState> = useSelector
