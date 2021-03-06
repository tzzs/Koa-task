const router = require('koa-router')();

const demo = require('./demo');
const user = require('./user');
const messageBoard = require('./messageBoard');

router.use('/demo', demo.routes(), demo.allowedMethods()); //测试接口
router.use('', user.routes(), user.allowedMethods()); //用户接口
router.use('', messageBoard.routes(), messageBoard.allowedMethods()); //留言接口


module.exports = router;


