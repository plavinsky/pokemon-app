import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { FireBaseContext } from "../../../../context/firebaseContext";
import { selectGame, gameMethods} from "../../../../store/game";
import FinishCards from "./component/FinishCards";
import s from "./style.module.css";


const FinishPage = (poks1,poks2) => {
    const history = useHistory();
    
    const firebase = useContext(FireBaseContext);
    const gameRedux = useSelector(selectGame);
    const dispatch = useDispatch();
    let newCard;

    console.log("Finish");

    if (gameRedux.winner != 1)
    {
        history.replace("/game");
        dispatch(gameMethods.clean());
    }

    function handleBackToStart() {
        dispatch(gameMethods.clean());

        if (newCard)
            firebase.addPokemon(newCard, async () => {
                history.push('/game/');
            }) 
        else 
            history.push('/game/');
    }

    const handleClickNewCard = (card) => {
        newCard = card
    }

    const getWiner = () => {
        return (gameRedux.winner === 1);
    }

    return (
           <>
                <div style={{justifyContent: "center", display: 'flex', marginTop: '10px', marginBottom: '10px'}}>
                    <h1>Your game cards:</h1>    
                </div> 

                <FinishCards 
                    player={1}
                    cards={Object.values({...gameRedux.player1})}
                />

                <div style={{justifyContent: "center", display: 'flex', marginTop: '10px', marginBottom: '10px'}}>
                    <button onClick={handleBackToStart} >END GAME</button>
                </div>

                <div style={{justifyContent: "center", display: 'flex', marginTop: '10px', marginBottom: '10px'}}>
                    <h1>{(gameRedux.winer === 1) ? "You Win - Choose 1 card:" : "You lose, end game and try again!"}</h1>    
                </div> 
                
                <FinishCards 
                    player={2}
                    cards={Object.values({...gameRedux.player2})}
                    ifWiner={getWiner()}
                    onClickNewCard={handleClickNewCard}
                />
            </>
    );

}

export default FinishPage;