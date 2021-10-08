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
        if (item.card === null)
        {
            res = false;
        }
            
    });

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
    const [serverBoard, setServerBoard] = useState([0,0,0,0,0,0,0,0,0]);

    
    const dispatch = useDispatch();
    const history = useHistory();


    if (Object.values(gameRedux.player1).length === 0)
        history.replace("/game");

    
    if (player1.length === 5 && player2.length === 5 && stateTurn === undefined)
    {
        
        setTimeout( () => {
            const turn = Math.floor(Math.random()*2+1);
            setStateTurn(turn);

            if (turn === 2)
            {
                setTimeout( async () => {
                    
                        const params = {
                            currentPlayer: 'p2',
                            hands: {
                            p1: player1,
                            p2: gameRedux.player2
                            },
                            move: null,
                            board: serverBoard,
                        };
        
                        const game = await requestAPI.game(params);
                    
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
                                setStateTurn(1);
                                
                            }, 1500)
                        }
                        setChoiceCard(null);
                    
                }, 500);
            }   

        }, 2000);
    }
    
    
    
    useEffect(async () => {
        async function asyncEffect() {
            const boardRequest = await requestAPI.getBoard();
            setBoard(boardRequest.data);
            
            const player2Request = await requestAPI.gameStart({pokemons: Object.values(gameRedux.player1)});
            const res = player2Request.data.map( item => ({
                ...item,
                possession: 'red',
                }));
            
            dispatch(gameMethods.player2Set(player2Request.data.map(item=>({...item}))));
            setPlayer2(res);
            
            
        }
        
        asyncEffect();
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

            if (choiceCard.player === 1) {
                setPlayer1(prevState => prevState.filter(item => item.id !== choiceCard.id))
            }

            if (choiceCard.player === 2) {
                setPlayer2(prevState => prevState.filter(item => item.id !== choiceCard.id))
            }

            setBoard(returnBoard(game.oldBoard));
            setStateTurn(2);

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

                    setStateTurn(1);
                }, 1500)
            }


            setChoiceCard(null);   
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
                <ArrowChoice side={stateTurn}/>
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