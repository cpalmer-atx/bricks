const User = require('../models/User');

// @desc      Create new user
// @route     POST /api/users/
// @access    Private
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      msg: 'Something went wrong while creating new user.'
    });
  }
}

// @desc      Get user by id
// @route     POST /api/users/:id
// @access    Public
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: `User with id ${req.params.id} not found`
      });
    }
    res.status(200).json({ success: true, data: user });
    
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      msg: 'Something went wrong while fetching user.'
    });
  }
}