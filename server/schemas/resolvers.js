const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User, Donation, Benefactor } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe');

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
            if(context.user){
                const donationData = await Donation.find().sort({ createdAt: -1 })

            return donationData;
            }
            throw new AuthenticationError('You\'re not logged in!');
        },

        getFilteredDonations: async (parent, { searchTerm }, context ) => {
            
            const donations = await Donation.find(
                {
                    $or: [
                        { benefactor: { $regex: searchTerm, $options: 'i' } },
                        { donorEmail: { $regex: searchTerm, $options: 'i' } }
                    ]
                }
            ).exec();

            return donations;
        },

        getDonation: async (parent, { _id }, context) => {
            if(context.user){
                const donation = await Donation.findOne({ _id });

            return donation;
            }

            throw new AuthenticationError('You\'re not logged in!');

        },

        getBenefactor: async (parent, { benefactorName }, context) => {
            if(context.user) {
                const benefactor = await Benefactor.findOne({ benefactorName: benefactorName })
                .select("-__v")
                .populate("donations")

            return benefactor;
            }
            
            throw new AuthenticationError('You\'re not logged in!');
        },

        getFilteredBenefactors: async (parent, { searchTerm }, context) => {
            if(context.user) {
            const benefactors = await Benefactor.find(
                { benefactorName: { $regex: searchTerm, $options: 'i' } }, 'benefactorName age about')
                .exec();

            return benefactors;
            }

            throw new AuthenticationError('You\'re not logged in!');
        },

        getBenefactors: async (parent, args, context) => {
            if(context.user) {
            const benefactordata = await Benefactor.find().sort({createdAt: -1 })
            .select('-__v')
            .populate("donations");

            return benefactordata;
            }

            throw new AuthenticationError('You\'re not logged in!');
        },

        order:  async(parent, { _id }, context) => {
            if(context.user){
                const user = await UserInputError.findById(context.user._id).populate({
                    path: 'orders.donations',
                    populate: 'benefactor'
                });

                return user.orders.id(_id);
            }

            throw new AuthenticationError('You\'re not logged in!');
            
        },

        checkout: async(parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ donations: args.donations });
            const { donations } = await order.populate('donations').execPopulate();

            const line_items = [];

            for(let i = 0; i < donations.length; i++){
                const donation = await stripe.products.create({
                    benefactor: donations[i].benefactor,
                    amount: products[i].amount,
                    message: donations[i].message
                });
                
                const price = await stripe.prices.create({
                    donation: donation.id,
                    unit_amount: donation[i].price*100,
                    currency: 'usd'
                });

                line_items.push({
                    price: price.id,
                    quantity: 1
                });
            };

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment', 
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}`
            });

            return { session: session.id };
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
            if(context.user) {
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
            }
            
            throw new AuthenticationError('You\'re not logged in!');
        },

        addOrder: async (parent, { donations }, context) => {
            if (context.user){
                const order = new Order({ donations });

                // update a user object??

                return order;
            }

            throw new AuthenticationError('You\'re not logged in!');
        },

        deleteDonation: async (parent, args, context) => {
            if(context.user) {
                const deletedDonation = await Donation.findByIdAndDelete(
                    { _id: args._id }
                );

                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { donations: {_id: args._id } } },
                    { new: true }
                );

                return updatedUser;
            }

            throw new AuthenticationError('You\'re not logged in!');
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
        }
    }
};

module.exports = resolvers;