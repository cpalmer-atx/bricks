const { check, validationResult } = require('express-validator');
const express = require('express');
const { 
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser
} = require('../controllers/user');

const router = express.Router();

router
  .route('/')
  .get(getUsers)
  .post([
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'A valid email is required').isEmail(),
    check('password', 'Password with 5 or more characters required').isLength({ min: 5 })
  ], createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;