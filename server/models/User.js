const mongoose = require('mongoose');

const { Schema } =  mongoose;
const Order = require('./Order');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    donations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Donation'
        }
    ],
    orders: //[Order.schema]
    [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }
    ]
},

{
    toJSON: {
        virtuals: true
    }
});

// pre-save middleware to save password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')){
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare incoming password with hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;