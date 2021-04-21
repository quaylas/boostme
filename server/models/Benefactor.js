const mongoose = require('mongoose');

const { Schema } = mongoose;

const benefactorSchema = new Schema({
    benefactorName: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    donations:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Donation'
        }
    ], 
    donationTotal
},
{
    toJSON: {
        virtuals: true
    }
});

userSchema.virtual('donationTotal').get(function() {
    if(this.donations.length){
        let sum = 0;
        for(let i = 0; i < this.donations.length; i++){
            sum = sum + this.donations[i].amount;
        }
        return sum;
    };
    return 0;
});

const Benefactor = model('Benefactor', benefactorSchema);

module.exports = Benefactor;