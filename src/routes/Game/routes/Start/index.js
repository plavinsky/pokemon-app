import { useEffect, useState } from "react";
import {database, addPokemon} from "../../services/firebase";
import PokemonCard from "../../components/PokemonCard";
import s from './style.module.css';

const StartPage = ({onChangePage}) => {
    const [pokemons, setPokemons] = useState({});
    const [dbChange, setDbChange] = useState(false);
    
    useEffect(() => {
        database.ref('pokemons').once('value', (snapshot) => {
            console.log("###:", snapshot.val());
            setPokemons(snapshot.val());
        });
    }, [dbChange]);

    const handleAddPokemonClick = () => {
        const data = Object.entries(pokemons)[Math.round(Math.random()*(Object.entries(pokemons).length-1))];
        const newKey = addPokemon(data);
        pokemons[newKey] = data[1];
        setPokemons({...pokemons});
    }

    const handleCardClick = (dbKey) => {
        setPokemons(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = {...item[1]};
                const pKey = item[0];
                
                if (pKey === dbKey) {
                    pokemon.active = !pokemon.active;
                    database.ref('pokemons/'+ dbKey).set(pokemon);
                };
        
                acc[item[0]] = pokemon;
        
                return acc;
            }, {});
        });

        function getKeyById(id){
            const res = Object.entries(pokemons).find( ([key, item]) => {    
                if (item && (item.id === id)) {
                    return true;
                }
            })
            return res[0];
        }      

    }


    return (
        <>        
        <div className={s.flex}>
            <button onClick={handleAddPokemonClick}>ADD NEW POKEMON</button>
        </div>

        <div className={s.flex} >
            {
              Object.entries(pokemons).map(([key, {name, id, img, type, values, active}]) => 
              <PokemonCard 
              key={key} 
              dbKey={key}
              name={name} 
              id={id} 
              img={img} 
              type={type} 
              values={values} 
              active={active} 
              handleCardClick={handleCardClick}
              style="height: 100em"/>)
            }
        </div>


        </>

    );

}

export default StartPage;