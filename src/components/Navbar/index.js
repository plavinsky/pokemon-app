import cn from "classnames";
import { useHistory } from "react-router";
import s from "./style.module.css";


const Navbar = ({onBtnClick, isActive, bgActive = false}) => {
    const history = useHistory();

    const handleClick = () => {
        onBtnClick && onBtnClick();
    }

    const handleLogoClick = () => {
        history.push('');
    }

    return (
        <nav id={s.navbar} className={cn({[s.bgActive]: bgActive})}>
        <div className={s.navWrapper}>
            <p className={s.brand} onClick={handleLogoClick}>
            LOGO
            </p>
            <div className={cn(s.menuButton, {[s.active]:!isActive})} onClick={handleClick}>
            <span />
            </div>

        </div>
        </nav>
    );
};

export default Navbar;