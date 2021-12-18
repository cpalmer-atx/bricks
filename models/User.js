const mongoose = require('mongoose');

const PartSchema = new mongoose.Schema({
    part_number: {
        type: String,
        // unique: true,
        // sparse: true,
        required: true
    },
    part_color: {
        name: { type: String },
        rgb: { type: String },
        transparent: { type: Boolean }
    },
    part_img: {
        type: String
    },
    quantity: {
        type: Number,
        required: true
    }
});

const ModelSchema = new mongoose.Schema({
    model_name: {
        type: String,
        required: true
    },
    model_number: {
        type: String,
        required: true,
        // unique: true,
        // sparse: true
    },
    brick_count: {
        type: Number,
        required: true
    },
    model_img: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    parts: [ PartSchema ]
});

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
    // model_inventory: {
    //     type: [ ModelSchema ],
    //     index: { unique: false, sparse: true }
    //     // default: [],
    //     // unique: false
    // },
    // brick_inventory: {
    //     type: [ PartSchema ],
    //     index: { unique: false, sparse: true }
    //     // default: [],
    //     // unique: false
    // }
    model_inventory: [ ModelSchema ],
    // brick_inventory: [ PartSchema ]
}, 
{ timestamps: true });

module.exports = mongoose.model('user', UserSchema);