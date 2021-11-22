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
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;