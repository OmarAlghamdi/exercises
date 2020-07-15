/**
 * Chess Exercise's functions
   * @author nadaalharbi
   * @module chess.js
   */
const { Chess } = require('chess.js');// library
const chess = new Chess();


//Define variables globaly to access them from server.js
let canWhiteAttack;
let canBlackAttack;
/**
 * 
 * @param {Object} white    Object from request's body
 * @param {Object} black    Object from request's body
 */
module.exports.setChessboard = (white, black) => {
    /** 
     * @example
     * if the input is Rook or ROOK it will convert it to lowerCase
    and takes the first char so if matches the chess library's chess.ROOK that returns 'r'
    */
    let whiteType = white.type.toLowerCase().charAt(0);
    const whitePosition = white.position.toLowerCase();

    /* Check if type equal to 'k' that means it's 'knight'
    convert it to "n" so it matches the library's chess.KNIGHT that return 'n'
     */
    if (whiteType == 'k') {
        whiteType = 'n';
    }
    let blackType = black.type.toLowerCase().charAt(0);
    const blackPosition = black.position.toLowerCase();
    if (blackType == 'k') {
        blackType = 'n';
    }

    // Insert positions to the chessboard. Capital letters: white, Small: black
    chess.put({ type: whiteType, color: chess.WHITE }, whitePosition);
    chess.put({ type: blackType, color: chess.BLACK }, blackPosition);
    /**
     * @example 
     * if white Position equal 'd3' take the first char 'd' and convert it to number   
     */
    const whiteIndex = this.convertCharToIndex(whitePosition.charAt(0));
    const blackIndex = this.convertCharToIndex(blackPosition.charAt(0));

    /*
    if the given type is not queen then, take white/black original positions
    white:(x:4, y: 1), black:(x: 4, y:8)
    */
    if (whiteType != 'q') {
        this.canWhiteAttack = this.canQueenAttack(4, 1, blackIndex, blackPosition.charAt(1));
    } else {
        this.canWhiteAttack = this.canQueenAttack(whiteIndex, whitePosition.charAt(1), blackIndex, blackPosition.charAt(1));
    }
    if (blackType != 'q') {
        this.canBlackAttack = this.canQueenAttack(4, 8, whiteIndex, whitePosition.charAt(1));
    } else {
        this.canBlackAttack = this.canQueenAttack(blackIndex, blackPosition.charAt(1), whiteIndex, whitePosition.charAt(1));
    }


    // Just for priniting on terminal:
    // Draw the chessboard 
    console.log(`Chessboard: \n ${chess.ascii()}`);
    console.log(`White possible moves: ${this.possibleMoves(whitePosition)}`);
    console.log(`Black possible moves: ${this.possibleMoves(blackPosition)}`);
    console.log(`Can White queen attack? ${this.canWhiteAttack}`);
    console.log(`Can Black queen attack? ${this.canBlackAttack}`);
}

/**
 * 
 * @param {String} position The position on chessboard  
 */
module.exports.possibleMoves = (position) => {
    return chess.moves({ square: position });
}

/**
 * Function to convert given position from character to number 
 * @param {char} char   Char between a-h as standerd chessboard
 * @returns {Number}    Number, to assign in the chessboard index
 * */
const charDict = {
    'a': 1, 'b': 2, 'c': 3, 'd': 4,
    'e': 5, 'f': 6, 'g': 7, 'h': 8
}
module.exports.convertCharToIndex = (char) => {
    return charDict[char];
}


/**
 * Function to check if Queen can attack
 * @param {Number} queenX The queen row index X
 * @param {Number} queenY The queen column index Y
 * @param {Number} opponentX The opponent's queen row index X
 * @param {Number} opponentY The opponent'squeen  column index Y
 * @returns {Boolean}   True if queen can attack opponent, Otherwise false if it can't
 */
module.exports.canQueenAttack = (queenX, queenY, opponentX, opponentY) => {
    // If queen and the opponent are in the same row 
    if (queenX == opponentX)
        return true;
    // If queen and the opponent are in the same column 
    if (queenY == opponentY)
        return true;
    // If queen can attack diagonally 
    if (Math.abs(queenX - opponentX) == Math.abs(queenY - opponentY))
        return true;

    // otherwise opponent is safe, queen can't atack 
    return false;
}