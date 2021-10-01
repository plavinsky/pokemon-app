import { useState } from "react";
import Menu from "../Menu"
import Modal from "../Modal";
import Navbar from "../Navbar"


const MenuHeader = ({bgActive}) => {
    const [isOpen, setOpen] = useState(null);
    const [isOpenModal, setOpenModal] = useState(false);
    
    const handleOpenMenuClick = () => {
        setOpen(prevState => !prevState);
    }

    const handleClickLogin = () => {
        setOpenModal(prevState => !prevState);
    }

    return (
        <>

        <Navbar 
            onMenuClick={handleOpenMenuClick} 
            onClickLogin={handleClickLogin}
            isActive={!isOpen} 
            bgActive={bgActive}/>
        <Menu 
            onBtnClick={handleOpenMenuClick} 
            isActive={isOpen} />
        
        
            <Modal  title="Log in!"
                    isOpen={isOpenModal}
                    onCloseModal={handleClickLogin}>
            Some text
            </Modal>
            
        </>
        
    );
    
};

export default MenuHeader;