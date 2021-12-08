const User = require("../models/User");
const axios = require('axios');

exports.addModel = async (req, res, next) => {
  const { user_id, model_num } = req.params;
  const user = await User.findById(user_id);
  const URI = `https://rebrickable.com/api/v3/lego/sets/${model_num}`;
  console.log(`${process.env.BRICKS_KEY}`);
  const headers = {
    'Authorization': `key ${process.env.BRICKS_KEY}`
  }
  
  if (!user) {
    return res.status(400).json({ msg: 'No user found with provided user ID' });
  }

  try {
    const model = await axios.get(URI, { headers });
    
    res.status(200).send({ 
      // msg: 'pinged addModel successfully!',
      // params: req.params,
      // query: req.query,
      // user: user,
      // key: headers.Authorization,
      data: model
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};