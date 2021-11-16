const app = require('./app');
const dotenv = require('dotenv');
const colors = require('colors');


dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5000;
const MODE = process.env.MODE;

const server = app.listen(PORT, () => {
  console.log(`${MODE} server listening on port ${PORT}...`.yellow.bold);
});

process.on('SIGINT', () => {
  console.log(`\nSIGINT signal received.`);
  console.log(`Closing HTTP server...`);
  server.close(() => {
    console.log(`HTTP server is now closed.`);
    // Close any other future connections here... (i.e. mongoDB connections)
    process.exit(0);
  });
});