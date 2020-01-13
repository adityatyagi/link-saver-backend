const {
    Pool
} = require('pg');

const pool = new Pool({
    user: 'aditya',
    host: 'localhost',
    database: 'todo',
    password: 'toor',
    port: 5432,
});


module.exports = {
    // a generic query, that executes all queries you send to it
    query: (text, params) => {
        return pool.query(text, params)
    }
}