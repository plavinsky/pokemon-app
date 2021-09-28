import { useContext, useEffect, useState } from "react";
import PokemonCard from "../../../../components/PokemonCard";
import s from './style.module.css';
import { FireBaseContext } from "../../../../context/firebaseContext";
import { PokemonContext } from "../../../../context/pokemonContext";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {getPokemonAsync, getPokemons, selectPokemonsData, selectPokemonsLoading} from "../../../../store/pokemons"

const StartPage = ({onChangePage}) => {
    const firebase = useContext(FireBaseContext);
    const pokemonsContext = useContext(PokemonContext);
    const isLoading = useSelector(selectPokemonsLoading);
    const pokemonsRedux = useSelector(selectPokemonsData);
    const dispatch = useDispatch();
    const history = useHistory();
    const [pokemons, setPokemons] = useState({});
    
    useEffect(() => {
        
        dispatch(getPokemonAsync());
    }, []);

    useEffect(() => {
        setPokemons(pokemonsRedux);
    }, [pokemonsRedux])


    const handleAddPokemonClick = () => {
        const data = Object.entries(pokemons)[Math.round(Math.random()*(Object.entries(pokemons).length-1))];
                
        firebase.addPokemon(data[1], async () => {
            //await getPokemons();
        })

    }

    const handleStartGame = () => {
        history.push('/game/board')
    }

    const handleCardClick = (key) => {
        const pokemon = {...pokemons[key]};
        pokemonsContext.onSelectedPokemon(key, pokemon);

        setPokemons(prevState => ({
                ...prevState,
                [key]: {
                    ...prevState[key],
                    selected: !prevState[key].selected
                }
            }))
            
    }


    return (
        <>        
        <div className={s.flex}>
            <button onClick={handleAddPokemonClick}>ADD NEW POKEMON</button>
            <button 
                onClick={handleStartGame}
                disabled={Object.keys(pokemonsContext.pokemon).length < 5}>START GAME</button>
        </div>

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
                if (Object.keys(pokemonsContext.pokemon).length < 5 || selected)
                handleCardClick(key)}
            }
              />)
            }
        </div>


        </>

    );

}

export default StartPage;