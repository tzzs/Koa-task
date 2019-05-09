const jwt = require('jsonwebtoken');
const jwtKoa = require('koa-jwt');

const secret = 'secret';

function getToken(payload = {}) {
    return jwt.sign(payload, secret, { expiresIn: '4h' });
}

function getJWTPayload(token) {
    return jwt.verify(token.split(' ')[1], secret);
}

const filter = jwtKoa({ secret: secret }).unless({
    path: [
        /^\/login/,
        /^\/register/,
    ]
});

module.exports = { getToken, getJWTPayload, filter };