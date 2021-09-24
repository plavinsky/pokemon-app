
import { useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { PokemonContext } from "../../context/pokemonContext";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";
import StartPage from "./routes/Start";

const GamePage = () => {
    const match = useRouteMatch();
    const [selectedPokemons, setSelectedPokemons] = useState({});
    const [player2Cards, setPlayer2Cards] = useState([]);
    const [winerResult, setWinerResult] = useState(undefined);

    const handleSelectedPokemons = (key, pokemon) => {
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

    const handleSetPlayer2 = (poks) => {
        console.log("handleSetPlayer2:", poks)
        console.log("handleSetPlayer2pokemon:", selectedPokemons)
        
        setPlayer2Cards({...poks});
    }

    const cleanPokemons = () => {
        setSelectedPokemons({});
        setWinerResult(undefined);
    }

    const handleSetWiner = (winer) => {
        console.log("setWinerResult", winer);
        setWinerResult(prevState => winer);
        console.log("winerResult", winerResult);
    }

    const handleGetWiner = () => {
        return winerResult;
    }

    return (
        <PokemonContext.Provider value={{
            pokemon: selectedPokemons,
            onSelectedPokemon: handleSelectedPokemons,
            player2Pokemons: player2Cards,
            onSetPlayer2: handleSetPlayer2,
            clean: cleanPokemons,
            winner: winerResult,
            setWiner: handleSetWiner,
            getWiner: handleGetWiner
            
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