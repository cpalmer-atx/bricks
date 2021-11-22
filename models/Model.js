const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
    model_number: {
        type: String,
        required: true
    },
    brick_count: {
        type: Number,
        required: true
    },
    inventory: [
        {
            part: {
                type: String,
                unique: true,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('model', ModelSchema);