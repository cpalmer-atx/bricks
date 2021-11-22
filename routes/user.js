const express = require('express');
const { 
  createUser,
  getUser,
  deleteUser
} = require('../controllers/user');

const router = express.Router();

router
  .route('/')
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .delete(deleteUser);

module.exports = router;