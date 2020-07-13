const { MongoClient } = require('mongodb');

class Database {
    constructor(url, dbName) {
        MongoClient.connect(url, {useUnifiedTopology: true})
            .then(client => {
                this.db = client.db(dbName);
                this.db.collection('logs', (err, res) => {
                    if (err) {
                        throw err;
                    }
                    this.logs = res;
                });
            })
            .catch(err => { throw err });
    }

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