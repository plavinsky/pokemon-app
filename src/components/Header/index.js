import s from './style.module.css';

const Header = ({title='Default title', descr='Default description'}) => {
    return (
        <div className={s.root}>
            <div className={s.forest}></div>
            <div>
                <h1>{title}</h1>
                <p>{descr}</p>
            </div>
        </div>
    )

}

export default Header