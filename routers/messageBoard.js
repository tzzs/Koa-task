const router = require('koa-router')();
const smb = require('./../services/messageBoard');

// router.get('/index', smb.index);
router.post('/index', smb.index); 
router.get('/index', async (ctx) => {
    console.log('index');
    await ctx.render('index', {});
  })


module.exports = router;