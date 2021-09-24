import React from 'react';
import PokemonCard from '../../../../../../components/PokemonCard';
import s from './style.module.css';

const FinishCards = ({cards, player}) => {
    
    console.log("cards:",cards);
    // return (
    //     <>
    //     </>
    // );


    return (
        <div className={s.finishflex}>
            
            {
                cards && cards.map(
                    (item) => (
                    // <div className={cn(s.cardBoard, 
                    //     {[s.selected]: isSelected === item.id})}
                    //     onClick={() => {
                    //         setSelected(item.id);
                    //         onClickCard && onClickCard({
                    //             player,
                    //             ...item})
                    //     }}>
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
                    // </div>
                ) )
            }

        </div>
    );
};

export default FinishCards;