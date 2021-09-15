
import { useHistory } from "react-router";
import MenuHeader from "../../components/MenuHeader";

const GamePage = ({onChangePage}) => {

    const history = useHistory();

    const handleButtonClick = () => {
        history.push('');
        //onChangePage && onChangePage('app');
    }

    return (

        <>        
        
        <div >
            <button onClick={handleButtonClick}>Home Page</button>
        </div>
        </>

    );
};

export default GamePage;