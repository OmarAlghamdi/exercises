require('dotenv').config({ path: './config.env' });
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

/**
 * @nadaalharbi
 * @module excercise-chess
 */
const chessGame = require('./exercise-chess');

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

    chessGame.setChessboard(white, black);

    const whitePosition = white.position.toLowerCase();
    const blackPosition = black.position.toLowerCase();

    const output = {
        whitePossibleMoves: chessGame.possibleMoves(whitePosition),
        blackPossibleMoves: chessGame.possibleMoves(blackPosition),
        canWhiteAttack: chessGame.canWhiteAttack,
        canBlackAttack: chessGame.canBlackAttack
    };
    // save to db
    db.logResult('chess/start', input, output);
    res.setHeader('Content-Type', 'application/json');
    res.json(output);
});



const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});