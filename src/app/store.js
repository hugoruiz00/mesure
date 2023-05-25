import { configureStore } from '@reduxjs/toolkit'
import shapeReducer from '../features/shape/shapeSlice'

export default configureStore({
  reducer: {
    shape: shapeReducer
  }
})