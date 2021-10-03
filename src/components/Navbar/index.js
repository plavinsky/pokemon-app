import cn from "classnames";
import { useHistory } from "react-router";
import {ReactComponent as LoginSVG} from "../../assets/login.svg";

import s from "./style.module.css";




const Navbar = ({onMenuClick: onMenuClick, isActive, bgActive = false, onClickLogin}) => {
    const history = useHistory();

    const handleClick = () => {
        onMenuClick && onMenuClick();
    }

    const handleLogoClick = () => {
        history.push('');
    }



    return (
        <nav id={s.navbar} className={cn({[s.bgActive]: bgActive})}>
        <div className={s.navWrapper}>
            <div>
                <p className={s.brand} onClick={handleLogoClick}>
                LOGO
                </p>
            </div>

            <div className={s.loginAndMenu}>
                <div className={s.loginWrap}
                onClick={onClickLogin}>
                    <LoginSVG />
                </div>
                <div>
                    <div className={cn(s.menuButton, {[s.active]:!isActive})} 
                         onClick={handleClick}>
                        <span />
                    </div>
                </div>

            </div>

            

        </div>
        </nav>
    );
};

export default Navbar;