const { AuthenticationError } = require('apollo-server-express');
const { User, Donation, Benefactor } = require('../models');
const { signToken } = require('../utils/auth');
const { decode } = require('jsonwebtoken');
const { user } = require('../config/connection');

const resolvers = {
    Query: {
        me: async ( parent, args, context ) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate("donations")

                return userData;
            }

            throw new AuthenticationError('You\'re not logged in!');
        },

        getDonations: async ( parent, args, context) => { 
            const donationData = await Donation.find().sort({ createdAt: -1 })

            return donationData;
        },

        getBenefactors: async (parent, args) => {
            const benefactordata = await Benefactor.find().sort({createdAt: -1 })

            .select('-__v')
            .populate("donations")
            return benefactordata;
        }


    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        addBenefactor: async (parent, args) => {
            const benefactor = await Benefactor.create(args)

            return benefactor;
        },

        addDonation: async (parent, args, context) => {
            const donation = await Donation.create({...args, donorEmail: context.user.email});

                 await User.findByIdAndUpdate(
                    { _id: context.user._id},
                    { $push: {donations: donation._id} },
                    {new: true }
                 );

                 await Benefactor.findOneAndUpdate(
                    { benefactorName: args.benefactor},
                    { $push: {donations: donation._id} },
                    {new: true }
                 );


            return donation;
            
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email })
            .select('-__v')
            .populate('donationsMade')
            .populate('projectsOwned');

            if(!user) {
                throw new AuthenticationError('Your credentials are incorrect!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Your credentials are incorrect!');
            }

            const token = signToken(user);
            return { token, user };
        },
            //getBenefactors


    }
};

module.exports = resolvers;