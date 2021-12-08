const express = require('express');
const {
  addModel
} = require('../controllers/rebrickable');

const router = express.Router();

router
  .route('/:user_id/:model_num')
  .post(addModel);

  module.exports = router;