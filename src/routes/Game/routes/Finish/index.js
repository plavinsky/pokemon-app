import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import FirebaseClass from "../../../../services/firebase";
import { selectGame, gameMethods} from "../../../../store/game";
import { selectUser } from "../../../../store/user";
import FinishCards from "./component/FinishCards";


const FinishPage = (poks1,poks2) => {
    const history = useHistory();
    const user = useSelector(selectUser);
    
    const gameRedux = useSelector(selectGame);
    const dispatch = useDispatch();
    let newCard;

    console.log("Finish");
    

    if (gameRedux.winner !== 1)
    {
        dispatch(gameMethods.clean());
        history.replace("/game");
    }

    function handleBackToStart() {
        
        if (newCard)
            FirebaseClass.addPokemonAPI(newCard, user, async () => {
                history.push('/game/');
            }) 
        else 
            history.push('/game/');
    }

    const handleClickNewCard = (card) => {
        newCard = card;
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