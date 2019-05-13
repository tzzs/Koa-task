const router = require('koa-router')();
const smb = require('./../services/messageBoard');

// router.get('/index', smb.index);
router.post('/index', smb.index);
router.get('/index', async (ctx) => {
  console.log('index');
  if (!ctx.session.user) {
    ctx.response.redirect('/login');
  }
  await ctx.render('index', {});
});

router.get('/', smb.index);

router.get('/addtest', smb.addtest);

router.put('/addtopic', smb.addtopic);

router.delete('/deletetopic', smb.deletetopic);

router.post('/modifytopic', smb.modifytopic);

router.get('/gettopic', smb.gettopic);


module.exports = router;