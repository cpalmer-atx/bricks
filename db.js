const mongoose = require('mongoose');

const connectDB = async (URI) => {
  try {
    const conn = await mongoose.connect(URI);
    console.log(`Connection to ${conn.connection.host} database successful.`.cyan.bold);
    conn.connection.on('error', err => { console.error('Database error detected!'.red.bold, err) });
  } catch (err) {
    console.error('Failed to connect to MongoDB... ', err);
  }
};

const disconnectDB = (callback) => {
  try {
    mongoose.connection.close(() => {
      console.log(`${mongoose.connection.host} database connection closed.`.magenta.bold);
      callback();
    });
  } catch (err) {
    console.error('An error occured while closing the database connection!'.red.bold, err);
  }
};

module.exports = {
  mongoConnect: connectDB,
  mongoDisconnect: disconnectDB
};