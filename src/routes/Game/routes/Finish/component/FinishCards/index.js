import React, { useState } from 'react';
import PokemonCard from '../../../../../../components/PokemonCard';
import s from './style.module.css';
import cn from 'classnames';

const FinishCards = ({cards, player, ifWiner, onClickNewCard}) => {
    const [isSelected,setSelected] = useState(null);
    
    return (
        <div className={s.finishflex}>
            
            {
                cards && cards.map(
                    (item) => (
                    <div 
                        key={item.name}
                        className={cn(s.cardBoard,
                        {[s.selected]: isSelected === item.id})}
                        onClick={() => {
                            ifWiner && setSelected(item.id);
                            ifWiner && onClickNewCard(item);
                        }}>
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

        </div>
    );
};

export default FinishCards;