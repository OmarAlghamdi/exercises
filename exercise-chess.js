/**
 * Chess Exercise's functions
   * @author nadaalharbi
   * @author Omar Alghamdi
   * @module chess.js
   */
const { Chess } = require('chess.js');// library


/**
 * 
 * @param {Object} white    Object from request's body
 * @param {Object} black    Object from request's body
 * @returns {Object}        Object contains two arrays of string, and two boolean values
 */
module.exports.getMoves = (white, black) => {
    const chess = new Chess();
    chess.clear();

    const mapPiece = {
        'king': chess.KING,
        'queen': chess.QUEEN,
        'bishop': chess.BISHOP,
        'knight': chess.KNIGHT,
        'rook': chess.ROOK,
        'pawn': chess.PAWN
    }

    /** 
     * @example
     * if the input is Rook or ROOK it will be mapped to lower-case
    and so if matches the chess library's chess.ROOK that returns 'rook' and includes the rules
    */
    let whiteType = mapPiece[white.type.toLowerCase()];
    const whitePosition = white.position.toLowerCase();
    let blackType = mapPiece[black.type.toLowerCase()];
    const blackPosition = black.position.toLowerCase();

    // Insert positions to the chessboard. Capital letters: white, Small: black
    chess.put({ type: whiteType, color: chess.WHITE }, whitePosition);
    chess.put({ type: blackType, color: chess.BLACK }, blackPosition);

    console.log("Current board setup");
    console.log(chess.ascii());

    // list all the possible moves 
    let whiteMoves = chess.moves({ square: whitePosition });
    chess.move(whiteMoves[0]);
    let blackMoves = chess.moves({ square: blackPosition });

    const pattern = /[a-z][0-9]/;

    whiteMoves = whiteMoves.map(move => move.match(pattern)[0].toUpperCase());
    blackMoves = blackMoves.map(move => move.match(pattern)[0].toUpperCase());
    
    console.log(`White possible moves: ${whiteMoves}`);
    console.log(`Black possible moves: ${blackMoves}`);
    
    let canWhiteAttack = whiteMoves.find(position => position == blackPosition.toUpperCase());
    let canBlackAttack = blackMoves.find(position => position == whitePosition.toUpperCase());

    if (canWhiteAttack) {
        canWhiteAttack = true;
    } else {
        canWhiteAttack = false;
    }
    if (canBlackAttack) {
        canBlackAttack = true;
    } else {
        canBlackAttack = false;
    }
    
    console.log(`Can White attack? ${canWhiteAttack}`);
    console.log(`Can Black attack? ${canBlackAttack}`);
    
    return {whiteMoves, blackMoves, canWhiteAttack, canBlackAttack };
}
