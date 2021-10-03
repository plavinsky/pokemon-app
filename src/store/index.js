import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./pokemonsStore";
import pokemonsReducer from "./pokemons";
import gameReducer from "./game";
import userReducer from "./user"


export default configureStore({
    reducer: {
        // counter: counterReducer,
        pokemons: pokemonsReducer,
        game: gameReducer,
        user: userReducer,
    }
})
