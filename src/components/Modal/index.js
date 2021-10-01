import cn from "classnames";
import { useEffect, useRef } from "react";
import s from "./style.module.css";

const Modal = ({isOpen, title, children, onCloseModal}) => {
    
    const modalEl = useRef();

    useEffect(() => {
        document.querySelector('body').style.overflow = isOpen ? 'hidden' : null;
    }, [isOpen])

    const handleCloseClick = () => {
        onCloseModal && onCloseModal(false);
    }
    const handleClickRoot = (event) => {
        console.log(modalEl.current);
        if (!modalEl.current.contains(event.target))
            onCloseModal(false);
    }

    return (
        <div 
            class={cn(s.root, {[s.open]: isOpen})}
            onClick={handleClickRoot}>
        <div class={s.modal}
            ref={modalEl}>
            <div class={s.head}>
                            { title }
                <span class={s.btnClose}
                      onClick={handleCloseClick}  
                      >
                </span>
            </div>
            <div className={s.content}>
                {children}
            </div>
        </div>
    </div>
    );
};

export default Modal;