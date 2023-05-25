import { createSlice } from '@reduxjs/toolkit'

const shapeSlice = createSlice({
  name: 'shape',
  initialState: [
    {id:1, position:{x:10, y:10}},
    {id:2, position:{x:30, y:10}},
    {id:3, position:{x:50, y:10}},
    {id:4, position:{x:50, y:10}},
  ],
  reducers: {
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

export const { vertexAdded, vertexUpdated } = shapeSlice.actions
export default shapeSlice.reducer