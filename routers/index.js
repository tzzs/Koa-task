const router = require('koa-router')();

const demo = require('./demo');
const user = require('./user');

router.use('/demo', demo.routes(), demo.allowedMethods());
router.use('', user.routes(), user.allowedMethods());

module.exports = router;


