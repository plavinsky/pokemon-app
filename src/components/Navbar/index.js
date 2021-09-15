import cn from "classnames";
import { useState } from "react";
import s from "./style.module.css";

const Navbar = ({onBtnClick, isActive, bgActive = false}) => {
  
    const handleClick = () => {
        onBtnClick && onBtnClick();
    }

    return (
        <nav id={s.navbar} className={cn(s.root, {[s.bgActive]: bgActive})}>

        <div className={s.navWrapper}>
            <p className={s.brand} >
            LOGO
            </p>
            <div className={cn(s.menuButton, {[s.active]:!isActive})} onClick={handleClick}>
            <span />
            </div>
        </div>
        </nav>
    );
};

export default Navbar;