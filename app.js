// const startupDebugger = require('debug')('app:startup');
const express = require('express');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(express.json());

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}
// Routers
app.use('/sanityCheck', require('./routes/sanity'));
app.use('/api/users', require('./routes/user'));

module.exports = app;