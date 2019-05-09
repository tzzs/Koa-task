const router = require('koa-router')();
const login = require('../services/user/login')

router.get('/login', login);

module.exports = router;