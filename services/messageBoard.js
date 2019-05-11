const { query } = require('./mysql');

const index = async (ctx) => {
    await ctx.render('index', {});
};

module.exports = { index };