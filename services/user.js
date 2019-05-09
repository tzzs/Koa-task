const crypto = require('crypto')
const { query } = require('./mysql')
const Msg = require('./../models/Msg')

async function queryAll() {
    let sql = 'select * from user';
    let dataList = await query(sql);
    return dataList;
}

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

    let sql = `select * from user where email='${email}'`;
    console.log(sql);
    let res = await query(sql);
    console.log(res);
    let msg = new Msg();
    if (res.length == 0) {
        //不存在
        let password = params.password;
        password = crypto.createHash('sha256').digest('hex');
        console.log(password);
        ctx.body = { email: email, password: password };
        let sql = `INSERT INTO user set email='${email}', password='${password}'`;
        res = await query(sql);
        console.log(res);
        ctx.body = res;
    } else {
        //存在
        msg.message = "false";
        ctx.body = msg;
    }
}

module.exports = { getAll, register }