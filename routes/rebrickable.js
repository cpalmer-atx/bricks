const auth = require('../middleware/auth');
const express = require('express');
const {
  addModel,
  deleteModel
} = require('../controllers/rebrickable');

const router = express.Router();

router
  .route('/:model_num')
  .post(auth, addModel)
  .delete(auth, deleteModel);

  module.exports = router;