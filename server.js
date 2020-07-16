require('dotenv').config({ path: './config.env' });
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

/**
 * @nadaalharbi
 * @module exercise-chess
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
    const { white, black } = req.body;

    const { whiteMoves, blackMoves, canWhiteAttack, canBlackAttack } = chessGame.getMoves(white, black);

    const output = {
        whitePossibleMoves: whiteMoves,
        blackPossibleMoves: blackMoves,
        canWhiteAttack: canWhiteAttack,
        canBlackAttack: canBlackAttack
    };
    // save to db
    db.logResult('chess/start', {white, black}, output);
    res.setHeader('Content-Type', 'application/json');
    res.json(output);
});



const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});