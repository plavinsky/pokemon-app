import React, { useContext, useEffect, useState } from 'react';
import cn from "classnames";
import PokemonCard from '../../../../../../components/PokemonCard';
import s from './style.module.css';
import { PokemonContext } from '../../../../../../context/pokemonContext';
import { useSelector } from 'react-redux';
import { selectTurn } from '../../../../../../store/player2pokemons';



const PlayerBoard = ({cards, onClickCard, player, turnPlayer}) => {
    const [isSelected,setSelected] = useState(null);
    const pokemonContext = useContext(PokemonContext);
    const turnRedux = useSelector(selectTurn);
    const [stateTurn, setStateTurn] = useState(1);

    useEffect(() => {
        
        setStateTurn(turnRedux);
    }, [turnRedux]);
    

    console.log("PlayerBoard cards" + player, cards);
    
    if (cards)
        return (
            <>
                {
                    cards && cards.map(
                        (item) => (
                        <div className={cn(s.cardBoard, 
                            {[s.selected]: isSelected === item.id})}
                            onClick={() => {
                                const turn = turnPlayer;

                                if (turn === player)
                                {
                                    console.log(item.id);
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
        )
    else
        return;
};

export default PlayerBoard;