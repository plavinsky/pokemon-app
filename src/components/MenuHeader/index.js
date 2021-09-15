import { useState } from "react";
import Menu from "../Menu"
import Navbar from "../Navbar"

const MenuHeader = ({bgActive}) => {
    const [isOpen, setOpen] = useState(null);
    
    const handleOpenMenuClick = () => {
        setOpen(prevState => !prevState);
    }

    return (
        <>
        <Navbar onBtnClick={handleOpenMenuClick} isActive={!isOpen} bgActive={bgActive}/>
        <Menu isActive={isOpen}/>
        
        </>
    );
    
};

export default MenuHeader;