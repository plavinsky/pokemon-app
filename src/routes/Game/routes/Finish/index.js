import { useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { PokemonContext } from "../../../../context/pokemonContext";
import PlayerBoard from "../Board/component/PlayerBoard";
import s from "./style.module.css";

const FinishPage = (poks1,poks2) => {
    const history = useHistory();
    //const {pokemons1, pokemons2} = useContext(PokemonContext);

    function handleBackToStart() {
       history.push('/game/');
    }

    return (
        <div className={s.flex}>
            <PlayerBoard 
            player={1}
            
            />

            <button onClick={handleBackToStart}>END GAME</button>

            <PlayerBoard 
            player={2}
            
            />
            
        </div>
    );

}

export default FinishPage;