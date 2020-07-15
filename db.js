// @ts-check

const { MongoClient } = require('mongodb');

/**
 * Provides abstraction to MongoDB
 */
class Database {
    /**
     * 
     * @param {String} url      MongoDB url
     * @param {String} dbName   MongoDB database name
     * @throws Throws error if db connection failed or cannot get collection
     */
    constructor(url, dbName) {
        MongoClient.connect(url, { useUnifiedTopology: true })
            .then(client => {
                /** @private */
                this.db = client.db(dbName);
                this.db.collection('logs', (err, res) => {
                    if (err) {
                        throw err;
                    }
                    /** @private */
                    this.logs = res;
                });

                /**
                 * @nadaalharbi 
                 * Create chess collection
                */
                this.db.collection('chess', (error, result) => {
                    if (error) {
                        return console.log('Unable to insert chess collection.');
                    }
                    this.chess = result;
                    console.log(`Connected Successfuly to the ${dbName} Database`)
                });
            });
    }

    /**
     * Saves request input and result to the database
     * @param   {String}          request API request endpoint
     * @param   {Number|Object}   input   either request parameters or body
     * @param   {Number|Object}   output  response sent to the user
     * @returns {Promise}   db insertion promise (result/error). it is up to the caller how to handle it.
     */
    logResult(request, input, output) {
        return this.logs.insertOne({
            request: request,
            input: input,
            output: output,
            timestamp: new Date()
        });
    }


    /**
     * @nadaalharbi
     * Store request's input and output to the database with Time and Date
     * @param {String} request   API POST request
     * @param {Object} input     JSON object with two name-value pairs (white - black) separated by a comma
     * each color has another two string name-value pairs (type - position)
     * @param {Object} output    Response as JSON object 
     */
    chessResult(request, input, output) {
        return this.chess.insertOne(
            {
                request: request,
                input: input,
                output: output,
                date: new Date()
            });
    }
}

module.exports = Database;