import { createSlice } from "@reduxjs/toolkit";

const scaleSlice = createSlice({
    name: 'scale',
    initialState: 0,
    reducers: {
        scaleSetted(state, action){
            return action.payload;
        }
    }
});

export const {scaleSetted} = scaleSlice.actions;
export default scaleSlice.reducer;