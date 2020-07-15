/**
 * Chess Exercise's functions
   * @author nadaalharbi
   * @module exercise-chess
   */


/**
 * Function to convert given position from character to number 
 * @param {char} char   Char between a-h as standerd chessboard
 * @returns {Number}    Number, to assign in the chessboard index
 * */
module.exports.convertCharToIndex = (char) => {
    switch (char) {
        case 'a':
            char = 1;
            break;
        case 'b':
            char = 2;
            break;
        case 'c':
            char = 3;
            break;
        case 'd':
            char = 4;
            break;
        case 'e':
            char = 5;
            break;
        case 'f':
            char = 6;
            break;
        case 'g':
            char = 7;
            break;
        case 'h':
            char = 8;
            break;
        default:
            console.log('Invalid Character.');
    }
    return char;
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