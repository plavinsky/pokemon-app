import { useContext, useEffect, useState } from "react";
import PokemonCard from "../../../../components/PokemonCard";
import s from './style.module.css';
import { FireBaseContext } from "../../../../context/firebaseContext";

import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {getPokemonAsync, selectPokemonsData} from "../../../../store/pokemons";
import {gameMethods, selectGame} from "../../../../store/game";

const StartPage = ({onChangePage}) => {
    const firebase = useContext(FireBaseContext);
    
    const pokemonsRedux = useSelector(selectPokemonsData);
    const dispatch = useDispatch();
    const history = useHistory();
    const [pokemons, setPokemons] = useState({});
    const gameRedux = useSelector(selectGame);
    
    
    useEffect(() => {
        dispatch(getPokemonAsync());
        dispatch(gameMethods.clean());
    }, []);

    useEffect(() => {
        setPokemons(pokemonsRedux);
    }, [pokemonsRedux]);


    const handleAddPokemonClick = () => {
        const data = Object.entries(pokemons)[Math.round(Math.random()*(Object.entries(pokemons).length-1))];
                
        firebase.addPokemon(data[1], async () => {
            //await getPokemons(); 
        })

    }

    const handleStartGame = () => {
        history.push('/game/board')
    }

    const handleCardClick = (keyID) => {
        const pokemon = {...pokemons[keyID]};
        dispatch(gameMethods.onPokemonAdd({ key : keyID, value : pokemon}));

        setPokemons(prevState => ({
                ...prevState,
                [keyID]: {
                    ...prevState[keyID],
                    selected: !prevState[keyID].selected
                }
            }))
            
    }


    return (
        <>        
        <div className={s.flex}>
            {/* <button onClick={handleAddPokemonClick}>ADD NEW POKEMON</button> */}
            <button 
                onClick={handleStartGame}
                disabled={gameRedux && gameRedux.player1 && (Object.keys(gameRedux.player1).length < 5)}>START GAME</button>
        </div>
        <br/>
        <br/>
        <div className={s.flex} >
            {
              Object.entries(pokemons).map(([key, {name, id, img, type, values, selected}]) => 
              <PokemonCard 
              className={s.card}
              key={key} 
              dbKey={key}
              name={name} 
              id={id} 
              img={img} 
              type={type} 
              values={values} 
              active={true} 
              isSelected={selected}
              handleCardClick={() => {
                if (Object.keys(gameRedux.player1).length < 5 || selected)
                handleCardClick(key)}
            }
              />)
            }
        </div>


        </>

    );

}

export default StartPage;