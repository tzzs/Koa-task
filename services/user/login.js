
module.exports = async (ctx) => {
    const query = ctx.request.query;
    console.log(query);
    await ctx.render('login', {
        query
    })
}
