const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// @desc      Create new user
// @route     POST /api/users/
// @access    Private
exports.createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;
  
  try {
    let user = await User.findOne({ email });
    if (user) { 
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

    user = new User({ name, email, avatar, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    }
    
    //TODO: reduce token expiration time before deploying!
    jwt.sign(
      payload, 
      process.env.JWT_TOKEN, 
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
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
    return res.status(200).json({ 
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

// @desc      Update user
// @route     PUT /api/users/:id
// @access    Private
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
        req.params.id, 
        req.body,
        { new: true, runValidators: true }
      );

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
      msg: 'Something went wrong while updating user.'
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