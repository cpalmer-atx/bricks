const app = require('./app');
const dotenv = require('dotenv');
const colors = require('colors');
// const mongoose = require('mongoose');
const { mongoConnect, mongoDisconnect } = require('./db');


dotenv.config({ path: './config/config.env' });
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
const MODE = process.env.MODE;

const server = app.listen(PORT, () => {
  console.log(`${MODE} server listening on port ${PORT}...`.yellow.bold);
});

mongoConnect(MONGO_URI);

process.on('SIGINT', () => {
  console.log(`\nSIGINT signal received.`.red.bold);
  server.close(() => {
    console.log(`http server closed.`.magenta.bold);
    mongoDisconnect(() => {
      process.exit(0)
    });
  });
});