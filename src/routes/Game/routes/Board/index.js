import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PokemonCard from '../../../../components/PokemonCard';
import { PokemonContext } from '../../../../context/pokemonContext';
import ArrowChoice from './component/ArrowChoice';
import PlayerBoard from './component/PlayerBoard';
import Result from './component/Result';

import s from './style.module.css';

const counterWin = (board, player1, player2) => {
    let player1Counter = player1.length;
    let player2Counter = player2.length;

    board.forEach(item => {
        if (item.card.possession === 'red')
            player2Counter++;

        if (item.card.possession === 'blue')
            player1Counter++;
    });

    return [player1Counter, player2Counter];
}


const BoardPage = () => {
    let {pokemon, onSetPlayer2, setWiner, winer, getTurn, setTurn} = useContext(PokemonContext);
    const [board, setBoard] = useState([]);
    
    const [player1, setPlayer1] = useState(() => {
        return Object.values(pokemon).map( item => ({
            ...item,
            possession: 'blue',
        }))
    });

    const [player2, setPlayer2] = useState([]);
    const [choiceCard, setChoiceCard] = useState(null);
    const [steps, setSteps] = useState(0);
    const [result, setResult] = useState(null);
    

    const history = useHistory();
    

    useEffect(async () => {
        const boardResponse = await fetch("https://reactmarathon-api.netlify.app/api/board");
        const boardRequest = await boardResponse.json();
        setBoard(boardRequest.data);
         
        const player2Response = await fetch("https://reactmarathon-api.netlify.app/api/create-player");
        const player2Request =  await player2Response.json();

        setPlayer2(
            () => {
                const res = player2Request.data.map( item => ({
                    ...item,
                    possession: 'red',
                    }));
                onSetPlayer2(res);
                return res;
            }
        )

    }, [])

    const setWinerContext = (win) => {
        setWiner(win);
        winer = win;
    }

    useEffect(() => {
        async function getFullResult() {
            
            if (steps === 9)
            {
                const [count1, count2] = counterWin(board, player1, player2);
                let caption = "";

                if (count1 > count2)
                {
                    setWinerContext(1);//console.log("WIN");
                    caption = 'win';
                }
                if (count1 < count2)
                {
                    setWinerContext(2);//console.log("LOSE");
                    caption = 'lose';
                }
                if (count1 === count2)  
                {
                    setWinerContext(0);//console.log("DRAW");
                    caption = 'draw';
                }

                setResult(caption);

                function sleep(ms) {
                    return new Promise(resolve => setTimeout(resolve, ms));
                }

                await sleep(4000);              
        
                history.push("/game/finish")
            }
        };


        getFullResult();
        
        
    }, [steps]);

    if (Object.values(pokemon).length < 5)
        history.replace("/game");
    

    const handleClickBoardPlate = async (position) => {
        
        const isDublicate = board.some(({card}) => {
            return (
                card.id === choiceCard.id &&
                card.possession === choiceCard.possession
            )
        });

        if (isDublicate) return;


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

            if (choiceCard.player === 1) {
                setPlayer1(prevState => prevState.filter(item => item.id !== choiceCard.id))
            }

            if (choiceCard.player === 2) {
                setPlayer2(prevState => prevState.filter(item => item.id !== choiceCard.id))
            }

            setBoard(request.data);
            setSteps(steps+1);
            setChoiceCard(null);

            const turn = getTurn();
            setTurn(turn === 1 ? 2 : 1)
        }

        
    }

    return (
        <div className={s.root}>
            
            <Result type={result}/>

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
                                item.card && <PokemonCard key={item.position} {...item.card} active minimize/>
                            }
                        </div>
                    ))
                }
            </div>

            <ArrowChoice side={getTurn()}/>

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