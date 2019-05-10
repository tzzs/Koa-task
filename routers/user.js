const router = require('koa-router')();
// const login = require('../services/user/login')
const { getAll, register, login, userLogin } = require('./../services/user')

router.post('/login', login);
router.get('/login', login);
router.post('/userlogin', userLogin);
router.post('/register', register);

module.exports = router;