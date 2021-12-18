const User = require("../models/User");
const axios = require('axios');

exports.addModel = async (req, res, next) => {
  const { model_num } = req.params;
  const setURI = `https://rebrickable.com/api/v3/lego/sets/${model_num}`;
  const partsURI = `${setURI}/parts`;
  const headers = {
    'Authorization': `key ${process.env.BRICKS_KEY}`
  }

  
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(400).json({ msg: 'No user found with provided user ID' });
    }

    const model_exists = user.model_inventory.find(lego => lego.model_number === model_num);

    if (model_exists) {
      ++model_exists.quantity;
      user.save();
      return res.status(200).send({ msg: `Model ${model_num} quantity updated in user profile.`});
    }

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
    
    const { name, set_num, num_parts, set_img_url } = model.data;

    const payload = {
      model_name: name,
      model_number: set_num,
      brick_count: num_parts,
      model_img: set_img_url,
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
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

exports.deleteModel = async (req, res, next) => {
  const { model_num } = req.params;
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(400).json({ msg: 'No user found with provided user ID' });
    }

    const existing = user.model_inventory.find(lego => lego.model_number === model_num);

    if (existing) {
      existing.quantity > 0 ? --existing.quantity : existing.quantity; 
      user.save();
      return res.status(200).send({ msg: `Model ${model_num} quantity updated in user profile.`});
    }
    return res.status(400).send({ msg: `Model ${model_num} not found in user inventory.` });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};