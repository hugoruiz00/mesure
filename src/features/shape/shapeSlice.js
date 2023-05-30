import { createSlice } from '@reduxjs/toolkit'

const shapeSlice = createSlice({
  name: 'shape',
  initialState: [],
  reducers: {
    shapeSetted(state, action){
      return action.payload;
    },
    vertexAdded(state, action) {
      state.push({
        id: action.payload.id,
        position: action.payload.position,
      })
    },
    vertexUpdated(state, action) {
      const vertex = state.find(vertex => vertex.id === action.payload.id)
      vertex.position = action.payload.position
    }
  }
})

export const { shapeSetted, vertexAdded, vertexUpdated } = shapeSlice.actions
export default shapeSlice.reducer