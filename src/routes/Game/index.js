
const GamePage = ({onChangePage}) => {

    const handleButtonClick = () => {
        onChangePage && onChangePage('app');
    }

    return (
        <div>
            <button onClick={handleButtonClick}>Home Page</button>
        </div>
    );
};

export default GamePage;