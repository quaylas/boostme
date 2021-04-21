const mongoose = require('mongoose');

const { Schema } = mongoose;
const dateFormat = require('../utils/dateFormat');

const donationSchema = new Schema({
    donationDate: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    },
    donorEmail: {
        type: String,
        required: true  
    },
    benefactor: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    message: {
        type: String,
        maxlength: 200
    }
},
{
    toJSON: {
        getters: true
    }
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;