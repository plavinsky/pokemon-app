import cn from "classnames";
import { Link } from "react-router-dom";
import s from "./style.module.css";

const MENU = [
    {
        title: "HOME",
        to: ""
    },
    {
        title: "GAME",
        to: "game"
    },
    {
        title: "ABOUT",
        to: "about"
    },
    {
        title: "CONTACT",
        to: "contact"
    }
]

const Menu = ({isActive: isOpen = null, onBtnClick}) => {
    
    const handleClick = () => {
        onBtnClick && onBtnClick();
    }

    return (
        <>
            <div className={cn(s.menuContainer, 
                {[s.active]: isOpen === true, 
                [s.deactive]: isOpen === false})}>
            <div className={s.overlay} />
            <div className={s.menuItems}>
                <ul>
                    {
                        MENU.map(({title, to}, index) => (
                            <li key={index}> 
                                <Link to={to} onClick={handleClick} replace>{title}</Link>
                            </li>
                        ))
                    }            
                </ul>
            </div>
            </div>
        </>
    );
};

export default Menu;