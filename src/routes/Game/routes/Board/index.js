import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PokemonCard from '../../../../components/PokemonCard';
import {selectGame, gameMethods} from "../../../../store/game";
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
    const [board, setBoard] = useState([]);
    const [choiceCard, setChoiceCard] = useState(null);
    const [steps, setSteps] = useState(0);
    const [result, setResult] = useState(null);
    const gameRedux = useSelector(selectGame);
    const [player1, setPlayer1] = useState(() => Object.values(gameRedux.player1).map(item=>({...item, possession:'blue'})));
    const [player2, setPlayer2] = useState([]);
    const [stateTurn, setStateTurn] = useState(1);    
    const dispatch = useDispatch();
    const history = useHistory();

    let turn = stateTurn;
        if (turn === undefined)
            {
                turn = Math.floor(Math.random()*2)+1;
                setStateTurn(turn);

            }

    useEffect(async () => {
        const boardResponse = await fetch("https://reactmarathon-api.netlify.app/api/board");
        const boardRequest = await boardResponse.json();
        setBoard(boardRequest.data);
         
        const player2Response = await fetch("https://reactmarathon-api.netlify.app/api/create-player");
        const player2Request =  await player2Response.json();

        const res = player2Request.data.map( item => ({
            ...item,
            possession: 'red',
            }));
        
        dispatch(gameMethods.player2Set(player2Request.data.map(item=>({...item}))));
        setPlayer2(res);
    }, [])


    useEffect(() => {
        async function getFullResult() {
            if (steps === 9)
            {
                const [count1, count2] = counterWin(board, player1, player2);
                let caption = "";

                if (count1 > count2)
                {
                    dispatch(gameMethods.setWinner(1));
                    caption = 'win';
                }
                if (count1 < count2)
                {
                    dispatch(gameMethods.setWinner(2));
                    caption = 'lose';
                }
                if (count1 === count2)  
                {
                    dispatch(gameMethods.setWinner(2));
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
    

    if (Object.values(gameRedux.player1).length < 5)
        history.replace("/game");
    

    const handleClickBoardPlate = async (position) => {
        
        const isDublicate = board.some(({card}) => {
            if (card && card.id && choiceCard && choiceCard.id)
                return (
                    card.id === choiceCard.id &&
                    card.possession === choiceCard.possession
                )
            else
                return false;
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
            setStateTurn(turn === 1 ? 2 : 1);
        }

        
    }

    return (
        <div className={s.root}>
            <Result type={result}/>
            <div className={s.playerOne}>
            <PlayerBoard 
                player={1}
                cards={player1} 
                turnPlayer={stateTurn}
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
            <ArrowChoice side={stateTurn}/>
            <div className={s.playerTwo}>
            <PlayerBoard 
                player={2}
                cards={player2} 
                turnPlayer={stateTurn}
                onClickCard={(card) => setChoiceCard(card)}/>
            </div>
        </div>
    )
}

export default BoardPage;