import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PokemonCard from '../../../../components/PokemonCard';
import { PokemonContext } from '../../../../context/pokemonContext';
import s from './style.module.css';

const BoardPage = () => {
    const [board, setBoard] = useState([]);
    const [player2, setPlayer2] = useState([]);
    const {pokemon} = useContext(PokemonContext);
    const history = useHistory();
    

    useEffect(async () => {
        const boardResponse = await fetch("https://reactmarathon-api.netlify.app/api/board");
        const boardRequest = await boardResponse.json();
        setBoard(boardRequest.data);
         
        const player2Response = await fetch("https://reactmarathon-api.netlify.app/api/create-player");
        const player2Request =  await player2Response.json();

        console.log("p2_data:", player2Request.data);
        setPlayer2(player2Request.data);

    }, [])

    // if (Object.values(pokemon).length < 5)
    //     history.replace("/game");
    //console.log("###:", pokemons);

    const handleClickBoardPlate = (position) => {
        console.log("##1:", position);
    }

    return (
        <div className={s.root}>
            <div className={s.playerOne}>
            {
                    Object.values(pokemon).map(
                        ({name, id, img, type, values, selected}) => (
                        <PokemonCard й
                        className={s.card}
                        key={id} 
                        dbKey={id}
                        name={name} 
                        id={id} 
                        img={img} 
                        type={type} 
                        values={values} 
                        active={true} 
                        isSelected={selected}
                        minimize/>
                    ) )
                }  
            </div>
            <div className={s.board}>
                {
                    board.map(item => (
                        <div key={item.position} className={s.boardPlate}
                        onClick={() => !item.card && handleClickBoardPlate(item.position)}>

                            {
                                item.card && <PokemonCard {...item} minimize />
                            }

                        </div>
                    ))
                }


           


               
            </div>

            <div className={s.playerTwo}>
            {
                    player2.map(
                        ({name, id, img, type, values, selected}) => (
                        <PokemonCard й
                        className={s.card}
                        key={id} 
                        dbKey={id}
                        name={name} 
                        id={id} 
                        img={img} 
                        type={type} 
                        values={values} 
                        active={true} 
                        isSelected={selected}
                        minimize/>
                    ) )
                }  
            </div>
        </div>
    );
};

export default BoardPage;