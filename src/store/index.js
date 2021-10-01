import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./pokemonsStore";
import pokemonsReducer from "./pokemons";
import gameReducer from "./game";


export default configureStore({
    reducer: {
        counter: counterReducer,
        pokemons: pokemonsReducer,
        //cards: cardsReducer
        game: gameReducer,
    }
})
