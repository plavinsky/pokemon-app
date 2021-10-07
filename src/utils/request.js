class Request {

    constructor() {
        this.host = "https://reactmarathon-api.herokuapp.com/api";
    }

    getBoard = async () => {
        return await fetch(`${this.host}/pokemons/board`).then(res => res.json());
    }

    gameStart = async (data) => {
        return await fetch(`${this.host}/pokemons/game/start`, {
            method: 'POST',
            body: JSON.stringify(data),
        }).then(res => res.json());
    }

}

const requestAPI = new Request();

export default requestAPI;