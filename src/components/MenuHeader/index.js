import { useState } from "react";
import Menu from "../Menu"
import Navbar from "../Navbar"

const MenuHeader = () => {
    const [isActive, setActive] = useState(false);
    
    const handleOpenMenuClick = () => {
        setActive(!isActive);
    }

    return (
        <>
        <Navbar onBtnClick={handleOpenMenuClick} isActive={!isActive}/>
        <Menu isActive={isActive}/>
        
        </>
    );
    
};

export default MenuHeader;