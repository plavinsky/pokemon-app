import { useContext } from "react";
import { useHistory } from "react-router";
import { PokemonContext } from "../../../../context/pokemonContext";
import FinishCards from "./component/FinishCards";
import s from "./style.module.css";

const FinishPage = (poks1,poks2) => {
    const history = useHistory();
    const pokemonContext = useContext(PokemonContext);

    console.log("finishPagePoks1:", pokemonContext);
    console.log("player2Pokemons:", pokemonContext.player2Pokemons);

    console.log("finishPagePoks2:", Object.values({...pokemonContext.pokemon}));

    console.log("pokemonContext.winer:", pokemonContext.winer)

    if (pokemonContext.getWiner() === undefined )
        history.replace("/game");

    function handleBackToStart() {
        pokemonContext.clean();
        history.push('/game/');
    }

    return (
        <div >
            <FinishCards 
            player={1}
            cards={Object.values({...pokemonContext.pokemon})}
            />

            <div style={{justifyContent: "center", display: 'flex', marginTop: '10px', marginBottom: '10px'}}>
                <button onClick={handleBackToStart} >END GAME</button>
            </div>
            <FinishCards 
            player={2}
            cards={Object.values({...pokemonContext.player2Pokemons})}
            />
            
        </div>
    );

}

export default FinishPage;