require('dotenv').config({ path: './config.env' });

/**
 * @nadaalharbi
 * @module excercise-chess
 * @module chess.js library
 */
const chessGame = require('./exercise-chess');
const { Chess } = require('chess.js');// library
const chess = new Chess();

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const mathFuncs = require('./exercise-math');
const Database = require('./db');

const PORT = process.env.PORT;
const DB_URL = process.env.MONGO_URL;
const DB_NAME = process.env.MONGO_DB;

const app = express();
app.use(bodyParser.json());

const db = new Database(DB_URL, DB_NAME);



// TODO: define/mount routes here
app.route('/math/stat')
    .post((req, res) => {
        const arr = req.body;

        const result = {
            mean: mathFuncs.findMean(arr),
            median: mathFuncs.findMedian(arr),
            mode: mathFuncs.findMode(arr)
        };

        // log to the db
        db.logResult('stat', arr, result);

        res.setHeader('Content-Type', 'application/json');
        res.json(result);

    });

app.route('/math/fibonacci/:index')
    .get((req, res) => {
        const index = req.params.index;

        const [result] = mathFuncs.findFibonacci(index, false);

        // log to the db
        db.logResult('fibonacci', index, result);

        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    })


/**
 * @nadaalharbi
 */
app.post('/chess/start', (req, res) => {
    const input = req.body;
    const white = req.body.white;
    const black = req.body.black;
    /*
    if the input is Rook or ROOK it will convert it to lowerCase
    and takes the first char so if matches the chess library's chess.ROOK that returns r
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

    // Inserting position to the chessboard. Capital letters: white, Small: black
    chess.put({ type: whiteType, color: chess.WHITE }, whitePosition);
    chess.put({ type: blackType, color: chess.BLACK }, blackPosition);

    // if for example white Position equal 'd3' take first char 'd' and convert it to number   
    const whiteIndex = chessGame.convertCharToIndex(whitePosition.charAt(0));
    const blackIndex = chessGame.convertCharToIndex(blackPosition.charAt(0));

    // Draw the chessboard 
    console.log(`Chessboard: \n ${chess.ascii()}`);
    // Possible moves
    console.log(`White possible moves: ${chess.moves({ square: whitePosition })}`);
    console.log(`Black possible moves: ${chess.moves({ square: blackPosition })}`);

    /*
    if the given type is not queen then, take white/black original positions
    white:(x:4, y: 1), black:(x: 4, y:8)
    */
    let canWhiteAttack;
    let canBlackAttack;
    if (whiteType != 'q') {
        canWhiteAttack = chessGame.canQueenAttack(4, 1, blackIndex, blackPosition.charAt(1));
    } else {
        canWhiteAttack = chessGame.canQueenAttack(whiteIndex, whitePosition.charAt(1), blackIndex, blackPosition.charAt(1));
    }
    if (blackType != 'q') {
        canBlackAttack = chessGame.canQueenAttack(4, 8, whiteIndex, whitePosition.charAt(1));
    } else {
        canBlackAttack = chessGame.canQueenAttack(blackIndex, blackPosition.charAt(1), whiteIndex, whitePosition.charAt(1));
    }
    console.log(`Can White queen attack? ${canWhiteAttack}`);
    console.log(`Can Black queen attack? ${canBlackAttack}`);




    const output = {
        whitePossibleMoves: chess.moves({ square: whitePosition }),
        blackPossibleMoves: chess.moves({ square: blackPosition }),
        canWhiteAttack: canWhiteAttack,
        canBlackAttack: canBlackAttack
    };
    // save to db
    db.chessResult('chess/start', input, output);
    res.setHeader('Content-Type', 'application/json');
    res.json(output);
});



const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});