const pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.POOLUSER,
    password: process.env.POOLPASSWORD,
    port: process.env.POOLPORT,
    database: process.env.POOLDATABASE
});

module.exports = pool;