import MenuHeader from "../../components/MenuHeader";

const GamePage = ({onChangePage}) => {

    const handleButtonClick = () => {
        onChangePage && onChangePage('app');
    }

    return (
        <>        
        <MenuHeader bgActive={true}/>
        <div >
            <button onClick={handleButtonClick}>Home Page</button>
        </div>
        </>
    );
};

export default GamePage;