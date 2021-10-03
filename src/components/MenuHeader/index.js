import { useState } from "react";
import LoginForm from "../LoginForm";
import Menu from "../Menu"
import Modal from "../Modal";
import Navbar from "../Navbar"


const MenuHeader = ({bgActive}) => {
    const [isOpen, setOpen] = useState(null);
    const [isOpenModal, setOpenModal] = useState(true);
    
    const handleOpenMenuClick = () => {
        setOpen(prevState => !prevState);
    }

    const handleClickLogin = () => {
        setOpenModal(prevState => !prevState);
    }

    const handleSubmit = async ({email, password}) => {

        console.log("email:", email);

        
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
        
        
            <Modal  title="Login/Register"
                    isOpen={isOpenModal}
                    onCloseModal={handleClickLogin}>
            <LoginForm 
                isOpen={isOpenModal}
                onSubmitLoginForm={handleSubmit}/>
            </Modal>
            
        </>
        
    );
    
};

export default MenuHeader;