
import { useState } from "react";
import { useHistory } from "react-router";
import PokemonCard from "../../components/PokemonCard";
import POKEMONS from '../../data/pokemons.json';

import s from './style.module.css';

const GamePage = ({onChangePage}) => {

    const history = useHistory();
    const [pokemons, setPokemons] = useState(POKEMONS);
    
    const handleButtonClick = () => {
        history.push('');
    }

    const handleCardClick = (id) => {
        // const res = pokemons.slice();
        // const card = res.find(item => item.id === id).active = ;
        // card.
        
        setPokemons(pokemons.map( item => {
            if (item.id === id){
                item.active = !item.active;
            }
            return item;
        }));
    }

    return (

        <>        
        <div >
            <button onClick={handleButtonClick}>Home Page</button>
        </div>

        <div className={s.flex}>
            {
              pokemons.map((item) => <PokemonCard key={item.id} name={item.name} id={item.id} img={item.img} type={item.type} values={item.values} active={item.active} handleCardClick={handleCardClick}/>)
            }
        </div>


        </>

    );
};

export default GamePage;