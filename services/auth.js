const jwt = require('jsonwebtoken');
const jwtKoa = require('koa-jwt');
const crypto = require('crypto');

const secret = 'secret';

function getToken(payload = {}) {
    return jwt.sign(payload, secret, { expiresIn: '4h' });
}

function getJWTPayload(token) {
    return jwt.verify(token.split(' ')[1], secret);
}

function getHash(str) {
    return crypto.createHash('sha256').update(str).digest('hex');
}

const filter = jwtKoa({ secret: secret }).unless({
    path: [
        /^\/login/,
        /^\/register/,
        /^\/static/
    ]
});

module.exports = { getToken, getJWTPayload, filter, getHash };