import { useContext } from "react";
import { useHistory } from "react-router";
import { FireBaseContext } from "../../../../context/firebaseContext";
import { PokemonContext } from "../../../../context/pokemonContext";
import FinishCards from "./component/FinishCards";
import s from "./style.module.css";

const FinishPage = (poks1,poks2) => {
    const history = useHistory();
    const pokemonContext = useContext(PokemonContext);
    const firebase = useContext(FireBaseContext);

    if (pokemonContext.getWiner() === undefined )
        history.replace("/game");

    function handleBackToStart() {
        pokemonContext.clean(); 

        if (pokemonContext.getWinCard())
            firebase.addPokemon(pokemonContext.getWinCard(), async () => {
                history.push('/game/');
            }) 
        else 
            history.push('/game/');
    }

    const handleClickNewCard = (card) => {
        pokemonContext.setWinCard(card);
    }

    return (
           <>
                <div style={{justifyContent: "center", display: 'flex', marginTop: '10px', marginBottom: '10px'}}>
                    <h1>Your game cards:</h1>    
                </div> 

                <FinishCards 
                    player={1}
                    cards={Object.values({...pokemonContext.pokemon})}
                />

                <div style={{justifyContent: "center", display: 'flex', marginTop: '10px', marginBottom: '10px'}}>
                    <button onClick={handleBackToStart} >END GAME</button>
                </div>

                <div style={{justifyContent: "center", display: 'flex', marginTop: '10px', marginBottom: '10px'}}>
                    <h1>{(pokemonContext.getWiner() === 1) ? "You Win - Choose 1 card:" : "You lose, end game and try again!"}</h1>    
                </div> 
                
                <FinishCards 
                    player={2}
                    cards={Object.values({...pokemonContext.player2Pokemons})}
                    ifWiner={pokemonContext.getWiner() === 1}
                    onClickNewCard={handleClickNewCard}
                />
            </>
    );

}

export default FinishPage;