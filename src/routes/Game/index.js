import { useEffect, useState } from "react";

import database from "../../services/firebase";

import PokemonCard from "../../components/PokemonCard";

import s from './style.module.css';

const GamePage = ({onChangePage}) => {
    const [pokemons, setPokemons] = useState({});
    const [dbChange, setDbChange] = useState(false);
    
    useEffect(() => {
        database.ref('pokemons').once('value', (snapshot) => {
            console.log("###:", snapshot.val());
            setPokemons(snapshot.val());
        });
    }, [dbChange]);

    const handleAddPokemonClick = () => {
        
        const data = Object.entries(pokemons)[Math.round(Math.random()*Object.entries(pokemons).length)];
        const newKey = database.ref().child('pokemons').push().key;
        database.ref('pokemons/' + newKey).set(data[1]);
        setDbChange(prevState => !prevState);
    }

    const handleCardClick = (id) => {
        setPokemons(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = {...item[1]};
                if (pokemon.id === id) {
                    pokemon.active = !pokemon.active;
                    database.ref('pokemons/'+ getKeyById(pokemon.id)).set(pokemon);
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

    const onPokemonCardClick = () => {

    }

    return (
        <>        
        <div className={s.flex}>
            <button onClick={handleAddPokemonClick}>ADD NEW POKEMON</button>
        </div>

        <div className={s.flex}>
            {
              Object.entries(pokemons).map(([key, {name, id, img, type, values, active}]) => 
              <PokemonCard 
              key={key} 
              name={name} 
              id={id} 
              img={img} 
              type={type} 
              values={values} 
              active={active} 
              handleCardClick={handleCardClick}
              onClick={onPokemonCardClick}/>)
            }
        </div>


        </>

    );
};




export default GamePage;