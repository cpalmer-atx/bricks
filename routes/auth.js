const { check } = require('express-validator');
const auth = require('../middleware/auth');
const express = require('express');
const {
  getAuthorizedUser,
  loginUser
} = require('../controllers/auth');

const router = express.Router();

router
  .route('/')
  .post([
      check('email', 'A valid email is required').isEmail(),
      check('password', 'Password is required').exists()
    ], loginUser)
  .get(auth, getAuthorizedUser);

module.exports = router;