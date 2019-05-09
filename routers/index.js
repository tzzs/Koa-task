const router = require('koa-router')();

const demo = require('./demo');
const login = require('./user');

router.use('', demo.routes(), demo.allowedMethods());
router.use('/user', login.routes(), login.allowedMethods());

module.exports = router;


