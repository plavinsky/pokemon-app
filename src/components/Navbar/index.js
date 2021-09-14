import cn from "classnames";
import { useState } from "react";
import s from "./style.module.css";

const Navbar = ({onBtnClick, isActive}) => {
  
    const handleClick = () => {
        
        console.log("Navbar:", isActive);
        onBtnClick && onBtnClick();
    }

    return (
        <nav className={s.root}>
        <div className={s.navWrapper}>
            <p className={s.brand} >
            LOGO
            </p>
            <a className={cn(s.menuButton, {[s.active]:!isActive}, {[s.deactive]: isActive})} onClick={handleClick}>
            <span />
            </a>
        </div>
        </nav>
    );
};

export default Navbar;