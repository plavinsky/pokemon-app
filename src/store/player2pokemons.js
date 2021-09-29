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
    name: 'player2pokemons',
    initialState: {
        isLoading: false,
        winer: undefined,
        turn: 1,
        data: {},
        error: null,
    },
    reducers: { 
        
        setPlayer2pokemons: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,
        }),
        setWiner: (state, action) => ({
            ...state,
            winer: action.payload,
        }),
        setTurn: (state, action) => ({
            ...state,
            turn: action.payload,
        }),

    }
})

//export const selectPlayer2pokemons = state => state.pokemons.data;
export const selectPlayer2pokemons = state => state.player2pokemons;


export const {setPlayer2pokemons,setWiner,setTurn} = slice.actions;

//export const selectPokemonsLoading = state => state.isLoading;

export const selectWiner = state => state.winer;
export const selectTurn = state => state.turn;

// export const getPokemonAsync = () => async dispatch => {
//     dispatch(fetchPokemons);
//     const data = await FirebaseClass.getPokemonsOnce();
//     dispatch(fetchPokemonsResolve(data))
// }

export default slice.reducer;
