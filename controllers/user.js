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
// @route     GET /api/users/:id
// @access    Public
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: 'User with given id not found.'
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

// @desc      Get all users
// @route     GET /api/users/
// @access    Public
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ 
      success: true, 
      count: users.length, 
      data: users 
    });
    
  } catch (err) {
    console.error(err);
    res.status(400).json({ 
      success: false, 
      msg: 'Something went wrong while fetching users.'
    });
  }
}

// @desc      Delete user
// @route     DELETE /api/users/:id
// @access    Public
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: 'User with given id not found'
      });
    }
    res.status(200).json({ success: true, data: {} });

  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      msg: 'Something went wrong while trying to delete user.'
    });
    
  }
}