const app = require('./app');

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
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