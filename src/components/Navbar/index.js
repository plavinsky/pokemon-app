import cn from "classnames";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {ReactComponent as LoginSVG} from "../../assets/login.svg";
import {ReactComponent as UserSVG} from "../../assets/user.svg";
import { selectLocalID, selectUserIsLoading } from "../../store/user";

import s from "./style.module.css";




const Navbar = ({onMenuClick, isActive, bgActive = false, onClickLogin}) => {

    const isLoading = useSelector(selectUserIsLoading);
    const localId = useSelector(selectLocalID);

    // const handleClick = () => {
    //     onMenuClick && onMenuClick();
    // }

    // const handleLogoClick = () => {
    //     history.push('');
    // }



    return (
        <nav id={s.navbar} className={cn({[s.bgActive]: bgActive})}>
        <div className={s.navWrapper}>
            <div>
                <p className={s.brand} onClick={onMenuClick}>
                LOGO
                </p>
            </div>

            <div className={s.loginAndMenu}>
                {
                    (!isLoading && !localId) && (
                        <div className={s.loginWrap}
                            onClick={onClickLogin}>
                            <LoginSVG />
                        </div>
                    )
                }
                
                {
                     (!isLoading && localId) && (
                        <div className={s.loginWrap}>
                            <Link to="/user">
                                <UserSVG />
                            </Link>
                        </div>
                     )
                }
                
                <div>
                    <div className={cn(s.menuButton, {[s.active]:!isActive})} 
                         onClick={onMenuClick}>
                        <span />
                    </div>
                </div>

            </div>

            

        </div>
        </nav>
    );
};

export default Navbar;