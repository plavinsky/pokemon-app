import React, { useContext, useState } from 'react';
import cn from "classnames";
import PokemonCard from '../../../../../../components/PokemonCard';
import s from './style.module.css';
import { PokemonContext } from '../../../../../../context/pokemonContext';



const PlayerBoard = ({cards, onClickCard, player}) => {
    const [isSelected,setSelected] = useState(null);
    const pokemonContext = useContext(PokemonContext);

    return (
        <>
            {
                cards && cards.map(
                    (item) => (
                    <div className={cn(s.cardBoard, 
                        {[s.selected]: isSelected === item.id})}
                        onClick={() => {
                            const turn = pokemonContext.getTurn()

                            if (turn === player)
                            {
                                pokemonContext.setTurn(turn === 1 ? 2 : 1)
                                setSelected(item.id);
                                onClickCard && onClickCard({
                                    player,
                                    ...item})
                            }
                        }}
                        >
                        <PokemonCard
                        key={item.id} 
                        dbKey={item.id}
                        name={item.name} 
                        id={item.id} 
                        img={item.img} 
                        type={item.type} 
                        values={item.values} 
                        active={true} 
                        isSelected={item.selected}
                        minimize
                        possession=""/>
                    </div>
                ) )
            }
        </>
    );
};

export default PlayerBoard;