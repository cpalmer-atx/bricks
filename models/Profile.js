const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    models: [
        {
            model: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'model'
            },
            count: {
                type: Number,
                required: true,
            }
        }
    ],
    brick_inventory: [
        {
            part: {
                type: String,
                unique: true
            },
            count: {
                type: Number,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('profile', ProfileSchema);