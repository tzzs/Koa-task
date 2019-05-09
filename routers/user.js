const router = require('koa-router')();
// const login = require('../services/user/login')
const {getAll,register} = require('./../services/user')

router.post('/login', getAll);
router.post('/register',register)

module.exports = router;