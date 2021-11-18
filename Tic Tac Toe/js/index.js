// ----------------GLOBALS----------------------
const playerOne = {
    name: "Player One",
    char: ''
};

const playerTwo = {
    name: "Player Two",
    char: ''
};

let turn = 0;

let boardState = [
    ['', '', ''], 
    ['', '', ''], 
    ['', '', '']
];

let gameHistory = [];

const winPatterns = [
    //Horizontal
    ['00', '01', '02'],
    ['10', '11', '12'],
    ['20', '21', '22'],

    //Vertical
    ['00', '10', '20'],
    ['01', '11', '21'],
    ['02', '12', '22'],

    //Diagonals
    ['00', '11', '22'],
    ['02', '11', '20']
]

let winningPattern = [];

// Elemet selectors
const heading = document.querySelector('.heading-primary')
const playerBox = document.querySelector('.player-box');
const playerAns = document.querySelectorAll('.player-box__ans');
const statusHeading = document.querySelector('.heading-primary--sub');
const gameCells = document.querySelectorAll('.cell');
const gameBox = document.querySelector('.game-box');
const restartBtn = document.querySelector('.restart');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// ----------------FUNCTIONS----------------------

// Updating board state array
const updateBoardState = (el, char) => {
    /*    
        element data-cell attribute tracker for the row and column number of the cell

        data-cell-row is for row (ex. 0) - 0 is for row
        data-cell-col in for column (ex. 1) - 1 is for column
    */

    const row = el.dataset.cellRow; // Data attribute data-cell-row
    const col = el.dataset.cellCol; // Data attribut data-cell-col

    if (boardState[row][col] === ''){
        boardState[row][col] = char;
    }
}

// Updating board display
const updateBoard = (boardState) => {
    for (let i = 0; i < boardState.length; i++) {
        for (let j = 0; j < boardState[i].length; j++) {
            const cell = document.querySelector(`.cell[data-cell-row='${i}'][data-cell-col='${j}']`);
            cell.textContent = boardState[i][j];
            cell.classList.add('neon-text', 'a-pulsate-primary');
        }
    }
}

// Updating game history array
const updateGameHistory = (boardState, gameHistory, clickedEl) => {
    let historyItem = {
        clickedElRow: "",
        clickedElCol: "",
        currBoardState: []
    };

    historyItem.clickedElRow = clickedEl.getAttribute("data-cell-row");
    historyItem.clickedElCol = clickedEl.getAttribute("data-cell-col");

    boardState.forEach((item) => {
        historyItem.currBoardState.push([...item]);
    });

    gameHistory.push(historyItem);
}

// Checking game status if someone won draw
const checkGameStatus = (winPatterns, boardState, turn) => {
    let result = 'next';

    for (let i = 0; i < winPatterns.length; i++) {
        const winPattern = winPatterns[i];
        
        const a = boardState[winPattern[0].substring(0,1)][winPattern[0].substring(1,2)];
        const b = boardState[winPattern[1].substring(0,1)][winPattern[1].substring(1,2)];
        const c = boardState[winPattern[2].substring(0,1)][winPattern[2].substring(1,2)];

        if (a === '' || b === '' || c === '') { continue; }

        if (a === b && b === c) {
            result = 'win';
            winningPattern = winPattern;
            break;
        }
    }

    if (turn === 9 && result === 'next') {
        result = 'draw';
    } 

    return result;
}

// Determines game status
const showGameStatus = (winPatterns, boardState, player, turn) => {
    switch (checkGameStatus(winPatterns, boardState, turn)) {
        case 'win':
            showWinner(statusHeading, player.name);         
            colorWinningCells(winningPattern);
            toggleButtons(gameHistory, turn, prevBtn, nextBtn);
            gameBox.classList.add('u-no-pointer-events');
            break;
        case 'draw':
            showDraw(statusHeading);
            toggleButtons(gameHistory, turn, prevBtn, nextBtn);
            gameBox.classList.add('u-no-pointer-events');
            break;
        default:     
            showNextPlayer(statusHeading, player);
            break;
    }
}

//Adds animation/color to winning cells 
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

// Determines next player using odd/even algo
const getPlayer = (el) => { 
    turn++;
    return turn % 2 === 0 ? playerTwo : playerOne;
}

// Shows winner in status heading
const showWinner = (el, playerName) => { 
    el.textContent = `${playerName} Won` 
    el.classList.remove('neon-text--secondary', 'a-pulsate-secondary');
    el.classList.add('neon-text--tertiary', 'a-pulsate-tertiary');
}

// Shows next player in status heading
const showNextPlayer = (el, player) => {
    if (player.name === 'Player One') {
        el.textContent = `${playerTwo.name}'s Turn (${playerTwo.char})`;
    }
    else {
        el.textContent = `${playerOne.name}'s Turn (${playerOne.char})`;
    }
}

// Shows draw in status heading
const showDraw = (el) => {
    el.textContent = 'Draw';
    gameCells.forEach(cell => {
        cell.classList.add('a-pulsate-draw');
    });
}

// Resets game into initial state
const restart = () => {
    boardState = [
        ['', '', ''], 
        ['', '', ''], 
        ['', '', '']
    ]
    gameHistory = [];
    winningPattern = [];
    turn = 0;
    playerOne.char = '';
    playerTwo.char = '';

    for (const cell of gameCells) {
        cell.textContent = '';
        cell.classList.remove('a-pulsate-winner', 'highlighted-cell', 'a-pulsate-draw');
    }

    gameBox.classList.remove('u-no-pointer-events');

    statusHeading.classList.remove('neon-text-tertiary', 'a-pulsate-tertiary');
    statusHeading.classList.add('neon-text-secondary', 'a-pulsate-secondary')
    statusHeading.textContent = `Player One's Turn (${playerOne.char})`;

    //  Hide buttons
    prevBtn.classList.add('u-hidden');
    nextBtn.classList.add('u-hidden');

    // Shows choose first turn UI
    playerBox.classList.remove('u-hidden');
    gameBox.classList.add('u-hidden');
    heading.classList.add('u-hidden');
    restartBtn.classList.add('u-hidden');
}

// Previous button functionality
const prev = (gameHistory, turn) => {
    const clickedCell = document.querySelector(`.cell[data-cell-row='${gameHistory[turn - 1].clickedElRow}'][data-cell-col='${gameHistory[turn - 1].clickedElCol}']`);

    updateBoard(gameHistory[turn - 1].currBoardState);

    gameCells.forEach(el => {
        el.classList.remove('highlighted-cell', 'a-pulsate-winner', 'a-pulsate-draw');
    });

    clickedCell.classList.add('highlighted-cell');
}

// Next button functionality
const next = (gameHistory, turn, winningPattern) => {
    const clickedCell = document.querySelector(`.cell[data-cell-row='${gameHistory[turn - 1].clickedElRow}'][data-cell-col='${gameHistory[turn - 1].clickedElCol}']`);

    updateBoard(gameHistory[turn - 1].currBoardState);

    gameCells.forEach(el => {
        el.classList.remove('highlighted-cell');
    });

    clickedCell.classList.add('highlighted-cell');
    if (turn === gameHistory.length) { 
        if (winningPattern.length === 0) gameCells.forEach(el => el.classList.add('a-pulsate-draw'));
        else colorWinningCells(winningPattern) 
    };
}

// Shows/Hides buttons depending on board state
const toggleButtons = (gameHistory, turn, ...buttons) => {
    let [prevBtn, nextBtn] = buttons;

    prevBtn.classList.remove('u-hidden');

    if (turn === 1) {
        prevBtn.classList.add('u-hidden');
    } 
    else {
        prevBtn.classList.remove('u-hidden');
    }

    if (turn !== gameHistory.length) {
        nextBtn.classList.remove('u-hidden');
    }
    else {
        nextBtn.classList.add('u-hidden');
    }
}

// Logs game history in console
const logMoves = (gameHistory) => {
    gameHistory.forEach((state, index) => {
         if (index === 0) console.log("-----------------------------------------------------");
        console.table(state.currBoardState);
         if (index === gameHistory.length - 1) console.log("-----------------------------------------------------");
    });
}

// Envent listener for when chossing first turn
playerAns.forEach(element => {
    element.addEventListener('click', (e) => {   
        playerOne.char = e.target.textContent;
        playerTwo.char = (playerOne.char === "1") ? '0' : '1';
        
        playerBox.classList.add('u-hidden');
        gameBox.classList.remove('u-hidden');
        heading.classList.remove('u-hidden');
        restartBtn.classList.remove('u-hidden');
  
        // Show player one's turn
        statusHeading.textContent = `Player One's Turn (${playerOne.char})`;
    });
});

// ----------------EVENT LISTENERS----------------------

// Adds event listener foreach game cell
gameCells.forEach(element => {
    element.addEventListener('click', (e) => {
        const player = getPlayer(e.target);
        
        updateBoardState(e.target, player.char); // Updates array
        updateBoard(boardState); // Updates board display
        updateGameHistory(boardState, gameHistory, e.target);   
        showGameStatus(winPatterns, boardState, player, turn);
        logMoves(gameHistory);
    });
});

// Add event listener for restart btn
restartBtn.addEventListener('click', restart);

// Event listener for previous button
prevBtn.addEventListener('click', (e) => {
    turn--;
    prev(gameHistory, turn);  
    toggleButtons(gameHistory, turn, e.target, nextBtn);
});

// Event listener for next button
nextBtn.addEventListener('click', (e) => { 
    turn++;
    next(gameHistory, turn, winningPattern);  
    toggleButtons(gameHistory, turn, prevBtn, e.target);
});


