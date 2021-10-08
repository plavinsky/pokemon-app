import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PokemonCard from '../../../../components/PokemonCard';
import {selectGame, gameMethods} from "../../../../store/game";
import ArrowChoice from './component/ArrowChoice';
import PlayerBoard from './component/PlayerBoard';
import Result from './component/Result';
import requestAPI from '../../../../utils/request'

import s from './style.module.css';
import { returnBoard } from '../../../../utils';

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

const isBoardFull = (board) => {
    let res = board.length > 0;

    board.forEach(item => {

        console.log("item:", item.card);
        if (item.card === null)
        {
            console.log("item:", item.card === null);
            res = false;
        }
            
    });

    console.log("res", res)
    return res;
}

const BoardPage = () => {
    const gameRedux = useSelector(selectGame);
    
    const [board, setBoard] = useState([]);
    const [player1, setPlayer1] = useState(() => Object.values(gameRedux.player1).map(item=>({...item, possession:'blue'})));
    const [player2, setPlayer2] = useState([]);
    
    const [stateTurn, setStateTurn] = useState(undefined);    
    const [result, setResult] = useState(null);
    const [choiceCard, setChoiceCard] = useState(null);
    const [steps, setSteps] = useState(0);
    const [serverBoard, setServerBoard] = useState([0,0,0,0,0,0,0,0,0]);

    
    const dispatch = useDispatch();
    const history = useHistory();

    let stepsCounter = 0;

    if (Object.values(gameRedux.player1).length === 0)
        history.replace("/game");

    let turn = stateTurn;
        if (turn === undefined)
            {
                turn = 2;//Math.floor(Math.random()*2+1);
                console.log("stateTurn", turn)
                setStateTurn(prevstate => turn);

            }
    
    

    

    useEffect(async () => {
        // const boardResponse = await fetch("https://reactmarathon-api.netlify.app/api/board");
        // const boardRequest = await boardResponse.json();

        async function asyncEffect() {
            const boardRequest = await requestAPI.getBoard();
            setBoard(boardRequest.data);
            

            console.log("boardRequest", JSON.stringify(boardRequest));
            
            // const player2Response = await fetch("https://reactmarathon-api.netlify.app/api/create-player");
            // const player2Request =  await player2Response.json();

            const player2Request = await requestAPI.gameStart({pokemons: Object.values(gameRedux.player1)});

            console.log("player2Request", JSON.stringify(player2Request));

            const res = player2Request.data.map( item => ({
                ...item,
                possession: 'red',
                }));
            
            dispatch(gameMethods.player2Set(player2Request.data.map(item=>({...item}))));
            setPlayer2(res);
            
            setTimeout( async () => {
                if (stateTurn === 2 & player1.length !== 0)
                {
                    console.log("effect2")
                    
                    if (player1.length === 0)
                        setPlayer1(Object.values(gameRedux.player1).map(item=>({...item, possession:'blue'})));

                    const params = {
                        currentPlayer: 'p2',
                        hands: {
                        p1: player1,
                        p2: res
                        },
                        move: null,
                        board: serverBoard,
                    };
    
                    const game = await requestAPI.game(params);
                    console.log("gameRequest", game)
                    
                    // if (game.hasOwnProperty('oldBoard'))
                    // setBoard(returnBoard(game?.oldBoard));
    
                        if (game.move !== null)
                        {
                            const idAi = game?.move?.poke?.id;
                        
                            setTimeout(() => setPlayer2(prevState => prevState.map(item => {
                                    if (item.id === idAi)
                                        return {
                                            ...item,
                                            selected: true,
                                        }
                
                                    return item;
                                })), 1000
                            );
    
                            setTimeout(() => {
                                setPlayer2(() => game.hands.p2.pokes.map(item => item.poke));
                                setServerBoard(game.board);
                                setBoard(returnBoard(game.board));
                                
                                console.log("steps021:", steps);
                                setSteps(1);
                                console.log("steps022:", steps);
                                
                            }, 1500)
                        }
    
    
                        //setSteps(count => count+1);
                        setChoiceCard(null);
                        console.log("steps01:", steps);
                        
                        setStateTurn(1);
                        console.log("stateTurn1:", stateTurn);
                }
            }, 500);
            

        }
        
        asyncEffect();

        // return async () => {
        
            

        // }
    }, [])


    useEffect(() => {
        async function getFullResult() {
            if (isBoardFull(board))
            {
                console.log("board", board);
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
    }, [board]);
    

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
            // const params = {
            //     position,
            //     card: choiceCard,
            //     board,
            // }

            // const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(params),
            // });

            // const request = await res.json();      
            
            const params = {
                currentPlayer: 'p1',
                hands: {
                    p1: player1,
                    p2: player2
                },
                move: {
                    poke: choiceCard,
                    position
                },
                board: serverBoard
            }

            const game = await requestAPI.game(params);
            console.log("gameRequest", game)

            if (choiceCard.player === 1) {
                setPlayer1(prevState => prevState.filter(item => item.id !== choiceCard.id))
            }

            if (choiceCard.player === 2) {
                setPlayer2(prevState => prevState.filter(item => item.id !== choiceCard.id))
            }

            // setBoard(prevState => prevState.map(item => {
            //     if (item.position === position)
            //         return {
            //             ...item,
            //             card: choiceCard
            //         }

            //     return item;
            // }));
            setBoard(returnBoard(game.oldBoard));

            if (game.move !== null)
            {
                const idAi = game.move.poke.id;
            
                setTimeout(() => setPlayer2(prevState => prevState.map(item => {
                        if (item.id === idAi)
                            return {
                                ...item,
                                selected: true,
                            }
    
                        return item;
                    })), 1000
                );

                setTimeout(() => {
                    setPlayer2(() => game.hands.p2.pokes.map(item => item.poke));
                    setServerBoard(game.board);
                    setBoard(returnBoard(game.board));

                    setSteps(prevState => prevState+1);
                    stepsCounter++;
                    console.log("steps after setBoard:", steps);
                }, 1500)
            }


            setSteps(count => count+1);
            stepsCounter++;
            setChoiceCard(null);

            console.log("steps:", steps);
            console.log("stepsCounter:", stepsCounter);
            //setStateTurn(prevState => prevState === 1 ? 2 : 1);
            console.log("stateTurn:", stateTurn);
            
        }

        
    }

    return (
        <div className={s.root}>
            {
                result && <Result type={result}/>
            }
            
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
            {
                (steps === 0 ) && <ArrowChoice side={stateTurn}/>
            }
            
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