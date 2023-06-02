import { configureStore } from '@reduxjs/toolkit'
import shapeReducer from '../features/shape/shapeSlice'
import scaleReducer from '../features/scale/scaleSlice'

export default configureStore({
  reducer: {
    shape: shapeReducer,
    scale: scaleReducer 
  }
})