const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const { Schema } =  mongoose;

const orderSchema = new Schema({
    purchaseDate:{
        type:Date,
        default:Date.now,
        get: timestamp => dateFormat(timestamp)
    },
    donations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Donation'
        }
    ]
        
    
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
