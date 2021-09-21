
import { useContext, useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { FireBaseContext } from "../../context/firebaseContext";
import { PokemonContext } from "../../context/pokemonContext";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";
import StartPage from "./routes/Start";

const GamePage = () => {
    const match = useRouteMatch();
    const firebase = useContext(FireBaseContext);
    const [selectedPokemons, setSelectedPokemons] = useState({});
    
    console.log("selectedPokemons:", selectedPokemons);
    

    const handleSelectedPokemons = (key, pokemon) => {
        console.log('handleSelectedPokemons');

        setSelectedPokemons(prevState => {
            if (prevState[key])
            {
                const copyState = {...prevState};
                delete copyState[key];

                return copyState;
            }

            return {
                ...prevState,
                [key]: pokemon
            }
            
        })
    }

    return (
        <PokemonContext.Provider value={{
            pokemon: selectedPokemons,
            onSelectedPokemon: handleSelectedPokemons
        }}>
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage} />
                <Route path={`${match.path}/board`} exact component={BoardPage} />
                <Route path={`${match.path}/finish`} exact component={FinishPage} />
            </Switch>
        </PokemonContext.Provider>
    )

};




export default GamePage;