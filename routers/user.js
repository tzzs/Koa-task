const router = require('koa-router')();
// const login = require('../services/user/login')
const user = require('./../services/user')

router.post('/login', user.login);
router.get('/login', user.login);
router.post('/userlogin', user.userLogin);
router.post('/register', user.register);
router.post('/sessionlogin', user.sessionlogin);

module.exports = router;