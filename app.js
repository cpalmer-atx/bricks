const express = require('express');

const app = express();

// Middleware
app.use(express.json());

// Routers
app.use('/sanityCheck', require('./routes/sanity'));

module.exports = app;