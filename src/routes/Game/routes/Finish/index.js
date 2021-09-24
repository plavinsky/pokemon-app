import { useContext } from "react";
import { useHistory } from "react-router";
import { PokemonContext } from "../../../../context/pokemonContext";
import PlayerBoard from "../Board/component/PlayerBoard";
import s from "./style.module.css";

const FinishPage = (poks1,poks2) => {
    const history = useHistory();
    const pokemonContext = useContext(PokemonContext);

    console.log("finishPagePoks1:", pokemonContext);
    console.log("player2Pokemons:", pokemonContext.player2Pokemons);



    function handleBackToStart() {
        pokemonContext.clean();
        history.push('/game/');
    }

    return (
        <div >
            <PlayerBoard 
            player={1}
            cards={Object.values({...pokemonContext.pokemon})}
            />

            <button onClick={handleBackToStart}>END GAME</button>

            <PlayerBoard 
            player={2}
            cards={Object.values({...pokemonContext.player2Pokemons})}
            />
            
        </div>
    );

}

export default FinishPage;