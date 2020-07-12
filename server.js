require('dotenv').config({path: './config.env'});

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const mathFuncs = require('./exercise-math');

const PORT = process.env.PORT;
const app = express();
app.use(bodyParser.json());

// TODO: define/mount routes here
app.route('/math/stat')
    .post((req, res) => {
        const arr = req.body;

        const result = {
            mean: mathFuncs.findMean(arr),
            median: mathFuncs.findMedian(arr),
            mode: mathFuncs.findMode(arr)
        };

        res.setHeader('Content-Type', 'application/json');
        res.json(result);

    });

app.route('/math/fibonacci/:index')
    .get((req, res) => {
        const index = req.params.index;

        const [ result ] = mathFuncs.findFibonacci(index, false);
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    })

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});