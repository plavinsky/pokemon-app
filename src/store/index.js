import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./pokemonsStore";
import pokemonsReducer from "./pokemons";

export default configureStore({
    reducer: {
        counter: counterReducer,
        pokemons: pokemonsReducer
    }
})
