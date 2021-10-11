export const returnBoard = (board) => {
    return board.map((item, index) => {
        let card = null;
        if (typeof item === 'object')
        {
            card = {
                ...item.poke,
                possession: item.holder === 'p1' ? "blue" : "red",
            }
        }

        return {
            position: index+1,
            card,
        }
        
    })
}

export const counterWin = (board, player1, player2) => {
    let player1Counter = player1.length;
    let player2Counter = player2.length;

    board.forEach(item => {
        if (item.card.possession === 'red')
            player2Counter++;

        if (item.card.possession === 'blue')
            player1Counter++;
    });

    return [player1Counter, player2Counter];
}

export const isBoardFull = (board) => {
    let res = board.length > 0;

    board.forEach(item => {
        if (item.card === null)
        {
            res = false;
        }
            
    });

    return res;
}