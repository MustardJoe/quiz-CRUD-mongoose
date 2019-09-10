require('dotenv').config();
const pg = require('pg');

const Client = pg.Client;

const DATABASE_URL = process.env.DATABASE_URL;
const client = new Client(DATABASE_URL);

client.connect()
  .then(() => console.log('connected to POSTGRES', DATABASE_URL))
  .catch(err => console.log('connection error', err));

client.on('error', err => {
  console.error('\n******** DATABASE ERROR ********', err);
});

module.exports = client;
