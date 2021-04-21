const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { decode } = require('jsonwebtoken');

const resolvers = {
    Query: {
        me: async ( parent, args, context ) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate(donations)

                return userData;
            }

            throw new AuthenticationError('You\'re not logged in!');
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
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
    }
};

module.exports = resolvers;