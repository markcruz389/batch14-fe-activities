class Game {
    constructor (gameBoard, ...players) {
        this.gameBoard = gameBoard;
        [ this.playerOne, this.playerTwo ] = players;

        //Default values
        this.turnCount = 0; // Used to track player's turn, even = player 1, odd = player 2
        this.state = [ // Game state is based on this array
            ['', '', ''], 
            ['', '', ''], 
            ['', '', '']
        ];
        this.winPatterns = [ // Static winning patterns used to determine if a player won every turn
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
            ['02', '11', '20'],
        ] ;
    }

    start = () => {
        console.log('test');
    }

    checkGameStatus = () => {
        let result = 'next';
    
        for (let i = 0; i < this.winPatterns.length; i++) {
            const winPattern = this.winPatterns[i];
            
            const a = this.boardState[winPattern[0].substring(0,1)][winPattern[0].substring(1,2)];
            const b = this.boardState[winPattern[1].substring(0,1)][winPattern[1].substring(1,2)];
            const c = this.boardState[winPattern[2].substring(0,1)][winPattern[2].substring(1,2)];
    
            if (a === '' || b === '' || c === '') { continue; }
    
            if (a === b && b === c) {
                result = 'win';
                colorWinningCells(winPattern);
                break;
            }
        }
    
        if (turn === 9 && result === 'next') {
            result = 'draw';
        } 
    
        return result;
    }   
     
    showNextPlayer = (el, player) => {
        if (player.name === 'Player One') {
            el.textContent = `${playerTwo.name}'s Turn`;
        }
        else {
            el.textContent = `${playerOne.name}'s Turn`;
        }
    }

    showWinner = (el, playerName) => { 
        el.textContent = `${playerName} Won` 
        el.classList.remove('neon-text--secondary', 'a-pulsate-secondary');
        el.classList.add('neon-text--tertiary', 'a-pulsate-tertiary');
    }

    showDraw = (el) => {
        el.textContent = 'Draw';
    }

    restart = () => {
        boardState = [
            ['', '', ''], 
            ['', '', ''], 
            ['', '', '']
        ]
    
        turn = 0;
    
        for (const cell of gameCells) {
            cell.textContent = '';
            cell.classList.remove('a-pulsate-winner');
        }
    
        gameBox.classList.remove('u-no-pointer-events');
    
        statusHeading.classList.remove('neon-text-tertiary', 'a-pulsate-tertiary');
        statusHeading.classList.add('neon-text-secondary', 'a-pulsate-secondary')
        statusHeading.textContent = "Player One's Turn";
    }
}

// export function test() { console.log('test') }

export { Game };








