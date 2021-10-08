import React, { useState } from 'react';
import cn from "classnames";
import PokemonCard from '../../../../../../components/PokemonCard';
import s from './style.module.css';




const PlayerBoard = ({cards, onClickCard, player, turnPlayer}) => {
    const [isSelected,setSelected] = useState(null);
    //isSelected === item.id
    if (cards)
        return (
            <>
                {
                    cards && cards.map(
                        (item) => (
                        <div key={item.id} className={cn(s.cardBoard, 
                            {[s.selected]: item.selected})}
                            onClick={() => {
                                const turn = turnPlayer;
                                console.log("turnPlayer", turnPlayer);
                                console.log("player", player);
                                if (turn === player)
                                {
                                    item.selected = true;
                                    onClickCard && onClickCard({
                                        player,
                                        ...item})
                                }
                                else
                                    item.selected = false;
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