const router = require('koa-router')();
// const login = require('../services/user/login')
const {getAll,register,login} = require('./../services/user')

router.post('/login', login);
router.post('/register',register)

module.exports = router;