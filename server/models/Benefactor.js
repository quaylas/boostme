const mongoose = require('mongoose');

const { Schema } = mongoose;
const Donation = require('./Donation')

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
    donations: [Donation.schema]
},
{
    toJSON: {
        virtuals: true
    }
});

benefactorSchema.virtual('donationTotal').get(function() {
    if(this.donations.length){
        let sum = 0;
        for(let i = 0; i < this.donations.length; i++){
            sum = sum + this.donations[i].amount;
        }
        return sum;
    };
    return 0;
});

const Benefactor = mongoose.model('Benefactor', benefactorSchema); //added  mongoose before models.

module.exports = Benefactor;