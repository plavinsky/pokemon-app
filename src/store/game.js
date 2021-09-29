import { createSlice } from "@reduxjs/toolkit";



export const slice = createSlice({
    name: "game",
    initialState: {
        player: {},
        player2: [],
        winner: 0
    },
    reducers:
    {
        player2Set : (state,action) => ({
            ...state,
            player2: action.payload,
        }),
        clean : (state,action) => ({
            data : Object(),
            player1 : Object(),
            player2 : [],
            winner : 0,
        }),
        setWinner : (state,action) => ({
            ...state,
            winner: action.payload,
        }),
    }
});


export const selectGame = state => state.game; 

export default slice.reducer;

