import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PokemonCard from '../../../../components/PokemonCard';
import { PokemonContext } from '../../../../context/pokemonContext';
import s from './style.module.css';

const BoardPage = () => {
    const [board, setBoard] = useState([]);
    const {pokemon} = useContext(PokemonContext);
    const history = useHistory();

    useEffect(async () => {
         const boardResponse = await fetch("https://reactmarathon-api.netlify.app/api/board");

         const boardRequest = await boardResponse.json();
         console.log("1:", boardRequest.data)
         setBoard(boardRequest.data);
         console.log("2:", board);
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
        </div>
    );
};

export default BoardPage;