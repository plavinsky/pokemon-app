import s from './style.module.css';


const Header = ({title=null, descr=null, onGameClick}) => {
    const handleGameClick = () => {
        onGameClick && onGameClick();
    }
    
    return (
        <header className={s.root}>
            <div className={s.forest}></div>
            <div className={s.container}>
                <h1>{title || 'Default title' }</h1>
                <p>{ descr ? descr : 'Default description' }</p>
                <button onClick={handleGameClick}>Start game</button>
            </div>
            
        </header>
    )

}

export default Header