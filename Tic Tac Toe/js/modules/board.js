class Board {
    constructor () {
        this.gameBox = document.querySelector('.game-box');
        this.boardCells = document.querySelectorAll('.cell');
        this.statusHeading = document.querySelector('.heading-primary--sub');
        this.restartBtn = document.querySelector('.restart');
    }
}

gameCells.forEach(element => {
    
    element.addEventListener('click', (e) => {
        const player = getPlayer(e.target);
        
        updateBoardState(e.target, player.char); // Updates array
        updateBoard(boardState); // Updates board display
        
        switch (checkGameStatus(winPatterns, boardState, turn)) {
            case 'win':
                showWinner(statusHeading, player.name);
                gameBox.classList.add('u-no-pointer-events');
                break;
            case 'draw':
                showDraw(statusHeading);
                gameBox.classList.add('u-no-pointer-events');
                break;
            default:     
                showNextPlayer(statusHeading, player);
                break;
        }

        console.log(boardState);
    });
});

const updateBoardState = (el, char) => {
    /*    
        element data-cell attribute tracker for the row and column number of the cell

        data-cell-row is for row (ex. 0) - 0 is for row
        data-cell-col in for column (ex. 1) - 1 is for column
    */

    // el.classList.add('a-rotatey-rv-180');

    // const elBack = el.nextElementSibling;
    // elBack.classList.add('a-rotatey-0');

    const row = el.dataset.cellRow; // Data attribute data-cell-row
    const col = el.dataset.cellCol; // Data attribut data-cell-col

    if (boardState[row][col] === ''){
        boardState[row][col] = char;
    }
}

const updateBoard = (boardState) => {
    for (let i = 0; i < boardState.length; i++) {
        for (let j = 0; j < boardState[i].length; j++) {
            // const cell = document.getElementById(`${i}${j}`);
            const cell = document.querySelector(`.cell[data-cell-row='${i}'][data-cell-col='${j}']`);
            cell.textContent = boardState[i][j];
            cell.classList.add('neon-text', 'a-pulsate-primary');
        }
    }
}

const colorWinningCells = (winPattern) => {
    for (let i = 0; i < winPattern.length; i++) {
        const row = winPattern[i].substring(0, 1);
        const col = winPattern[i].substring(1, 2);
        
        for (const cell of gameCells) {
            if (cell.dataset.cellRow === row && cell.dataset.cellCol === col) {
                // cell.classList.add('neon-text--red');
                cell.classList.remove('neon-text--primary', 'a-pulsate-primary');
                cell.classList.add('neon-text--tertiary', 'a-pulsate-winner');
            }
        }
    }
}

