import cn from "classnames";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {ReactComponent as LoginSVG} from "../../assets/login.svg";
import {ReactComponent as UserSVG} from "../../assets/user.svg";
import { selectLocalID, selectUserIsLoading } from "../../store/user";

import s from "./style.module.css";




const Navbar = ({onMenuClick: onMenuClick, isActive, bgActive = false, onClickLogin}) => {
    const history = useHistory();

    const isLoading = useSelector(selectUserIsLoading);
    const localId = useSelector(selectLocalID);

    console.log("Navbar isLoading", isLoading);
    console.log("Navbar localId", localId);

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