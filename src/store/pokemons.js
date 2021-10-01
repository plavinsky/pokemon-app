// pokemon: selectedPokemons,
// onSelectedPokemon: handleSelectedPokemons,

import { createSlice } from "@reduxjs/toolkit";
import FirebaseClass from "../services/firebase";

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
    name: 'pokemons',
    initialState: {
        isLoading: false,
        data: {},
        error: null,
    },
    reducers: {
        fetchPokemons: (state, action) => ({
            ...state,
            isLoading: true,
        }),
        fetchPokemonsResolve: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,
        }),
        fetchPokemonsReject: (state, action) => ({
            ...state,
            isLoading: false,
            data: {},
            error: action.payload,
        }),

    }
})


export const {fetchPokemons, fetchPokemonsResolve, fetchPokemonsReject} = slice.actions;

export const selectPokemonsLoading = state => state.pokemons.isLoading;
export const selectPokemonsData = state => state.pokemons.data;

export const getPokemonAsync = () => async dispatch => {
    dispatch(fetchPokemons);
    const data = await FirebaseClass.getPokemonsOnce();
    dispatch(fetchPokemonsResolve(data))
}

export default slice.reducer;
