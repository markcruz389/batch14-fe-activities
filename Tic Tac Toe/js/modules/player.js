//Constructor function for creating player objects
const Player = function (name, char) {
    this.name = name;
    this.char = char;
}

const getPlayer = (el) => {
    turn++;
    return turn % 2 === 0 ? playerTwo : playerOne;
}

export { Player, getPlayer } 