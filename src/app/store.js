import { configureStore } from '@reduxjs/toolkit'
import menuSlice  from '../features/pages/Home/menu.Slice'
import authSlice from '../features/pages/auth/auth.Slice'

export const store = configureStore({
  reducer: {
    menu: menuSlice,
    auth: authSlice,
  },
})