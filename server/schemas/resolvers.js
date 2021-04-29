const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User, Donation, Benefactor, Order } = require('../models');
require('dotenv').config('../.env');

const { signToken } = require('../utils/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

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

        getOrders: async ( parent, args, context) => { 
            if(context.user){
                const orderdata = await Order.find().sort({ createdAt: -1 })
                .populate("donations");

            return orderdata;
            }
            throw new AuthenticationError('You\'re not logged in!');
        },

        order:  async(parent, { _id }, context) => {
            if(context.user){
                const order = await Order.findOne({_id}).populate(
                'donations');

                return order;
            }

            throw new AuthenticationError('You\'re not logged in!');
            
        },

        checkout: async(parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ donations: args.products });
            
            const { products } = await order.populate('donations').execPopulate();

            const line_items = [];

            for(let i = 0; i < order.donations.length; i++){
                const product = await stripe.products.create({
                    name: order.donations[i].benefactor
                });
                console.log(product);
                
                const price = await stripe.prices.create({
                    product: product.id,
                    unit_amount: order.donations[i].amount*100,
                    currency: 'usd'
                });
                console.log(price);
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
            const donation = await Donation.create({...args, donorEmail: context.user.email,
                donorName: context.user.firstName + " " + context.user.lastName});

            return donation;
            }
            
            throw new AuthenticationError('You\'re not logged in!');
        },

        addOrder: async (parent, args, context) => {
            if (context.user){
                const order =  await Order.create({...args});

                const fullOrder = await Order.findOne({_id:order._id}).populate("donations");
   
                for(let i =0; i < fullOrder.donations.length; i++){

                    await User.findByIdAndUpdate(
                        { _id: context.user._id},
                        { $push: {donations: fullOrder.donations[i]._id} },
                        {new: true }
                
                    );
    
                    await Benefactor.findOneAndUpdate(
                        { benefactorName: fullOrder.donations[i].benefactor},
                        { $push: {donations: fullOrder.donations[i]._id} },
                        {new: true }
                    );
                 } 

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