import { useState } from "react";
import { useSelector } from "react-redux";
import { selectLocalID, selectUserIsLoading } from "../../store/user";
import LoginForm from "../LoginForm";
import Menu from "../Menu"
import Modal from "../Modal";
import Navbar from "../Navbar"


const MenuHeader = ({bgActive}) => {
    const [isOpen, setOpen] = useState(null);
    const [isOpenModal, setOpenModal] = useState(true);
    const isLoading = useSelector(selectUserIsLoading);
    const localId = useSelector(selectLocalID);

    const handleOpenMenuClick = () => {
        setOpen(prevState => !prevState);
    }

    const handleClickLogin = () => {
        setOpenModal(prevState => !prevState);
    }

    const handleSubmit = async () => {
        handleClickLogin();   
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
                    isOpen={!isLoading && !localId && isOpenModal}
                    onCloseModal={handleClickLogin}>
            <LoginForm 
                isOpen={isOpenModal}
                onSubmitLoginForm={handleSubmit}/>
            </Modal>
            
        </>
        
    );
    
};

export default MenuHeader;