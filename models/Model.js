const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
    model_number: {
        type: String,
        required: true,
        unique: true
    },
    brick_count: {
        type: Number,
        required: true
    },
    inventory: [
        {
            part_number: {
                type: String,
                unique: true,
                required: true
            },
            part_img: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    model_img: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('model', ModelSchema);