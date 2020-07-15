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
}

module.exports = Database;