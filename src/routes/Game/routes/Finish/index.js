import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import s from "./style.module.css";

const FinishPage = () => {
    const history = useHistory();

    function handleBackToStart() {
       history.push('/game/');
    }

    return (
        <div className={s.flex}>
            
            {/* <button onClick={handleBackToStart}>Start new Game!</button> */}

            <Link to="/">
             
             Start new Game!
            </Link>
        </div>
    );

}

export default FinishPage;