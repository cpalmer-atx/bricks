const Model = require("../models/Model");
const User = require("../models/User");
const axios = require('axios');

exports.addModel = async (req, res, next) => {
  const { user_id, model_num } = req.params;
  const setURI = `https://rebrickable.com/api/v3/lego/sets/${model_num}`;
  const partsURI = `${setURI}/parts`;
  const headers = {
    'Authorization': `key ${process.env.BRICKS_KEY}`
  }

  const user = await User.findById(user_id);
  if (!user) {
    return res.status(400).json({ msg: 'No user found with provided user ID' });
  }
  
  try {
    const model = await axios.get(setURI, { headers });
    const parts = await axios.get(partsURI, { headers });

    const inv_array = parts.data.results.map(part => 
      {
        const newPart = {
          part_number: part.part.part_num,
          part_img: part.part.part_img_url,
          quantity: part.quantity,
          part_color: {
            name: part.color.name,
            rgb: part.color.rgb,
            transparent: part.color.is_trans
          }
        }
        return newPart;
      });

    const payload = {
      model_name: model.data.name,
      model_number: model.data.set_num,
      brick_count: model.data.num_parts,
      model_img: model.data.set_img_url,
      quantity: 1,
      parts: inv_array
    }

    await user.model_inventory.push(payload);
    await user.save();

    res.status(200).send({ 
      msg: 'pinged addModel successfully!',
      data: payload
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};