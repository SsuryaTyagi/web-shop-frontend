import { configureStore } from '@reduxjs/toolkit'
import menuSlice  from '../features/pages/Home/menu.Slice'

export const store = configureStore({
  reducer: {
    menu: menuSlice
  },
})