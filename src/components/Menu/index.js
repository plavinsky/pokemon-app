import cn from "classnames";
import { useState } from "react";
import s from "./style.module.css";

const MENU = [
    {
        title: "HOME",
        to: "#welcome"
    },
    {
        title: "GAME",
        to: "#game"
    },
    {
        title: "ABOUT",
        to: "#about"
    },
    {
        title: "CONTACT",
        to: "#welcome"
    }
]

const Menu = ({isActive: isOpen = null}) => {
    
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
                                <a href={to}>{title}</a>
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