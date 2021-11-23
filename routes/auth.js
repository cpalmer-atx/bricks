const auth = require('../middleware/auth');
const express = require('express');
const {
  getAuthorizedUser
} = require('../controllers/auth');

const router = express.Router();

router
  .route('/')
  .get(auth, getAuthorizedUser);

module.exports = router;