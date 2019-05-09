const crypto = require('crypto')
const { query } = require('./mysql')

async function queryAll() {
    let sql = 'select * from user';
    let dataList = await query(sql);
    return dataList;
}

// module.exports = async (ctx) => {
//     const query = ctx.request.query;
//     console.log(query);
//     await ctx.render('login', {
//         query
//     })
// }


const getAll = async (ctx) => {
    let list = await queryAll();
    console.log(list)
    await ctx.render('all', {
        list
    })
}

const register = async (ctx) => {
    let params = ctx.request.query;
    let email = params.email;
    let password = params.password;
    password = crypto.createHash('sha256').digest('hex');
    console.log(password);
    ctx.body = { email: email, password: password };
}

module.exports = { getAll,register }