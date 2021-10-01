// pokemon: selectedPokemons,
// onSelectedPokemon: handleSelectedPokemons,

import { createSlice } from "@reduxjs/toolkit";

// player2Pokemons: player2Cards,
// onSetPlayer2: handleSetPlayer2,

// clean: cleanPokemons,

// winner: winerResult,
// setWiner: handleSetWiner,
// getWiner: handleGetWiner,

// winCard: newCard,
// getWinCard: handleGetNewCard,
// setWinCard: handleSetNewCard,

// turn: playerTurn,
// getTurn: handleGetPlayerTurn, 
// setTurn: handleSetPlayerTurn


export const slice = createSlice({
    name: 'counter',
    initialState: {
        count: 0,
    },
    reducers: {
        plusAction: (state, action) => ({
            ...state,
            count: state.count + action.payload,
        }),
        minusAction: (state, action) => ({
            ...state,
            count: state.count - action.payload,
        })

    }
})


export const {plusAction, minusAction} = slice.actions;
export const selectCount = state => state.counter.count;

export default slice.reducer;
