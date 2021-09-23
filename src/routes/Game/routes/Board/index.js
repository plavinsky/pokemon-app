import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PokemonCard from '../../../../components/PokemonCard';
import { PokemonContext } from '../../../../context/pokemonContext';
import PlayerBoard from './component/PlayerBoard';
import s from './style.module.css';

const counterWin = (board, player1, player2) => {
    let player1Counter = player1.length;
    let player2Counter = player2.length;

    board.forEach(item => {
        if (item.card.posession === 'red')
            player2Counter++;

        if (item.card.posession === 'blue')
            player1Counter++;
    });

    return [player1Counter, player2Counter];
}


const BoardPage = () => {
    const {pokemon} = useContext(PokemonContext);
    const [board, setBoard] = useState([]);
    
    const [player1, setPlayer1] = useState(() => {
        return Object.values(pokemon).map( item => ({
            ...item,
            posession: 'blue',
        }))
    });
    const [player2, setPlayer2] = useState([]);
    const [choiceCard, setChoiceCard] = useState(null);
    const [steps, setSteps] = useState(0);

    const history = useHistory();
    

    useEffect(async () => {
        const boardResponse = await fetch("https://reactmarathon-api.netlify.app/api/board");
        const boardRequest = await boardResponse.json();
        setBoard(boardRequest.data);
         
        const player2Response = await fetch("https://reactmarathon-api.netlify.app/api/create-player");
        const player2Request =  await player2Response.json();

        console.log("p2_data:", player2Request.data);
        setPlayer2(
            () => {
                return player2Request.data.map( item => ({
                ...item,
                posession: 'red',
                }));
            }
        )

    }, [])

    useEffect(() => {
        if (steps === 9)
        {
            const [count1, count2] = counterWin(board, player1, player2);

            if (count1 > count2)
                alert("WIN");

            if (count1 < count2)
                alert("LOSE");

            if (count1 === count2)
                alert("DRAW");
        }
        
    }, [steps]);

    if (Object.values(pokemon).length < 5)
        history.replace("/game");
    

    const handleClickBoardPlate = async (position) => {
        console.log("##1:", position);
        console.log("choice:", choiceCard);

        if (choiceCard) {
            const params = {
                position,
                card: choiceCard,
                board,
            }

            const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            const request = await res.json();
            console.log("req#:", request);
            

            if (choiceCard.player === 1) {
                setPlayer1(prevState => prevState.filter(item => item.id !== choiceCard.id))
            }

            if (choiceCard.player === 2) {
                setPlayer2(prevState => prevState.filter(item => item.id !== choiceCard.id))
            }

            setBoard(request.data);
            setSteps(steps+1)

        }

        
    }

    return (
        <div className={s.root}>
            <div className={s.playerOne}>

            <PlayerBoard 
                player={1}
                cards={player1} 
                onClickCard={(card) => setChoiceCard(card)}/>
            
            </div>
            <div className={s.board}>
                {
                    board.map(item => (
                        <div key={item.position} className={s.boardPlate}
                        onClick={() => !item.card && handleClickBoardPlate(item.position)}>
                            {
                                item.card && <PokemonCard {...item.card} active minimize/>
                            }
                        </div>
                    ))
                }
            </div>

            <div className={s.playerTwo}>
            <PlayerBoard 
                player={2}
                cards={player2} 
                onClickCard={(card) => setChoiceCard(card)}/>
            
            </div>
        </div>
    )
}

export default BoardPage;