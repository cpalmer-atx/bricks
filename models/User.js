const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    model_inventory: [
        {
            model_num: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'model'
            },
            model_img: {
                type: String
            },
            count: {
                type: Number,
                required: true,
            }
        }
    ],
    model_count: {
        type: Number,
        default: 0
    },
    brick_inventory: [
        {
            part_num: {
                type: String,
                unique: true
            },
            part_color: {
                type: String
            },
            part_img: {
                type: String
            },
            count: {
                type: Number,
                required: true
            }
        }
    ],
    brick_count: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', UserSchema);