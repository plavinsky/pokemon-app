import cn from 'classnames';

import s from './style.module.css';

const ArrowChoice = ({ stop = false, side = 0}) => {
    
    console.log("ArrowChoice", side);
    
    return <div className={cn(s.arrow, {
        [s.rightSide]: side === 2,
        [s.leftSide]: side === 1
    })} />;
};

export default ArrowChoice;
