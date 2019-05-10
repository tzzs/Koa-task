const router = require('koa-router')();

const demo = require('./demo');
const user = require('./user');
const messageBoard = require('./messageBoard');

router.use('/demo', demo.routes(), demo.allowedMethods());
router.use('', user.routes(), user.allowedMethods());
router.use('', messageBoard.routes(), messageBoard.allowedMethods());

module.exports = router;


