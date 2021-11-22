const express = require('express');
const { 
  createUser,
  getUser,
  getUsers,
  deleteUser
} = require('../controllers/user');

const router = express.Router();

router
  .route('/')
  .get(getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .delete(deleteUser);

module.exports = router;