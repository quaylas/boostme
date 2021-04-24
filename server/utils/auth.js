const jwt = require('jsonwebtoken');
require('dotenv').config('../.env');

const secret =  'mysecretsshhhhh';//process.env.JWT_SECRET; could not query with this. Not sure why asked for secret to have a value
const expiration = '2h';

module.exports = {
    authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
        token = token
        .split(' ')
        .pop()
        .trim();
    }

    console.log("token", token)


    if (!token) {
        return req;
    }

    try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
    }
    catch {
        console.log('Invalid token');
    }

    return req;
    },
    signToken: function ({ firstName, lastName, email, _id }) {
    const payload = { firstName, lastName, email, _id };

    return jwt.sign(
        { data: payload },
        secret,
        { expiresIn: expiration }
    );
    }
};