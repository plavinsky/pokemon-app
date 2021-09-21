
import cn from 'classnames';

import cardBacksideImg from './assets/card-back-side.jpeg';

import s from './style.module.css';

const PokemonCard = ({name, img, id, type, values, active, handleCardClick, dbKey, className, minimize}) => {
    
    
    const handleClick = () => {
        handleCardClick(dbKey);
    }
    
    return (    
        <div className={s.root} onClick={handleClick}>
            <div className={cn(className, s.pokemonCard, {[s.active]:active})}>
                <div className={s.cardFront}>
                    <div className={cn(s.wrap, s.front)}>
                        <div className={cn(s.pokemon, s[type])}>
                            <div className={s.values}>
                                <div className={cn(s.count, s.top)}>{values.top}</div>
                                <div className={cn(s.count, s.right)}>{values.right}</div>
                                <div className={cn(s.count, s.bottom)}>{values.bottom}</div>
                                <div className={cn(s.count, s.left)}>{values.left}</div>
                            </div>
                            <div className={s.imgContainer}>
                                <img src={img} alt={name}/>
                            </div>
                            { !minimize &&  (<div className={s.info}>
                                <span className={s.number}>#{id}</span>
                                <h3 className={s.name}>{name}</h3>
                                <small className={s.type}>Type: <span>{type}</span></small>
                            </div> )}
                        </div>
                    </div>
                </div>

                <div className={s.cardBack}>
                    <div className={cn(s.wrap, s.back)}>
                        <img src={cardBacksideImg} alt="Сard Backed" />
                    </div>
                </div>

            </div>
         </div>
        
    );
}

export default PokemonCard;