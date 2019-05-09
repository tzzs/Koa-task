const crypto = require('crypto')
const { query } = require('./mysql')
const Msg = require('./../models/Msg')
const auth = require('./auth')

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

    //查询当前用户是否存在
    let sql = `select * from user where email='${email}'`;
    console.log(sql);
    let res = await query(sql);
    // console.log(res);

    let msg = new Msg();
    if (res.length == 0) {
        try {
            //不存在
            let password = params.password;

            if (!email || !password) {
                msg.code = 400;
                msg.message = 'false';
                msg.data = { error: `expected an object with username, password but got: ${params}` };
                ctx.body = msg;
                return;
            }

            //密码加密
            password = auth.getHash(password);
            console.log(password);
            ctx.body = { email: email, password: password };
            let sql = `INSERT INTO user set email='${email}', password='${password}'`;
            await query(sql);

            msg.code = 0;
            msg.message = 'success';
            msg.data = { token: auth.getToken({ email: email, password: password }) };
            ctx.body = msg;
        } catch (error) {
            msg.code = 401;
            msg.message = "false";
            ctx.body = msg;
        }
    } else {
        //存在
        msg.code = 401;
        msg.message = "false";
        msg.data = { data: '用户名已存在' };
        ctx.body = msg;
    }
}

const userLogin = async (ctx) => {
    const params = ctx.request.query;
    const email = params.email;
    const password = params.password;
    let msg = new Msg();
    try {
        const user = await query(`select * from user where email='${email}'`);
        if (user.length == 0) {
            msg.code = 401;
            msg.message = '用户名错误';
        }
        console.log(user);
        if (auth.getHash(password) == user[0].password) {
            msg.message = '登录成功';
            msg.data = { token: getToken({ email: email, password: password }) };
        } else {
            msg.code = 401;
            msg.message = '密码错误';
        }
        ctx.body = msg;
    } catch (error) {
        msg.code = 401;
        msg.message = '登录时发生错误';
        ctx.body = msg;
    }
}

const login = async (ctx) => {
    await ctx.render('login', {})
}

module.exports = { getAll, register, login }