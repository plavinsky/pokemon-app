import { useContext, useEffect, useState } from "react";
import {database, addPokemon} from "../../../../services/firebase";
import PokemonCard from "../../../../components/PokemonCard";
import s from './style.module.css';
import { FireBaseContext } from "../../../../context/firebaseContext";
import { PokemonContext } from "../../../../context/pokemonContext";
import { useHistory } from "react-router";

const StartPage = ({onChangePage}) => {
    const firebase = useContext(FireBaseContext);
    const pokemonsContext = useContext(PokemonContext);
    const history = useHistory();
    console.log("###:", pokemonsContext);

    const [pokemons, setPokemons] = useState({});
    const [dbChange, setDbChange] = useState(false);
    
    useEffect(() => {
        firebase.getPokemonSocket((pokemons) => {
            setPokemons(pokemons);
        })

        return () => firebase.offPokemonSocket();
    }, []);

    

    const handleAddPokemonClick = () => {
        const data = Object.entries(pokemons)[Math.round(Math.random()*(Object.entries(pokemons).length-1))];
        // const newKey = addPokemon(data);
        // pokemons[newKey] = data[1];
        // setPokemons({...pokemons});
        
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
        
        // setPokemons(prevState => {
        //     return Object.entries(prevState).reduce((acc, item) => {
        //         const pokemon = {...item[1]};
        //         const pKey = item[0];
                
        //         if (pKey === dbKey) {
        //             pokemon.active = !pokemon.active;
        //            // database.ref('pokemons/'+ dbKey).set(pokemon);
        //            firebase.postPokemon(pKey, pokemon);
        //         };
        
        //         acc[item[0]] = pokemon;
        
        //         return acc;
        //     }, {});
        // });

        // function getKeyById(id){
        //     const res = Object.entries(pokemons).find( ([key, item]) => {    
        //         if (item && (item.id === id)) {
        //             return true;
        //         }
        //     })
        //     return res[0];
        // }      

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