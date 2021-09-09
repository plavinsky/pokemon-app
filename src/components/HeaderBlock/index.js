import s from './style.module.css'
console.log('####: s', s);

const HeaderBlock = () => {
    return (
        <div>
            <h1 className={s.header}>This is Pokemon card game</h1>
            <p>Simple Triple Triad Game</p>
        </div>
    )
}

export default HeaderBlock;