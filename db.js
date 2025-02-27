const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',  
  host: 'localhost',
  database: 'reddit_db',  
  password: 'Alcatelpopana1',  
});

module.exports = pool;
