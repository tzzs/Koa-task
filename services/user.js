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
    let username = params.username;

    //查询当前用户是否存在
    let sql = `select * from user where username='${username}'`;
    console.log(sql);
    let res = await query(sql);
    // console.log(res);

    let msg = new Msg();
    if (res.length == 0) {
        try {
            //不存在
            let password = params.password;

            if (!username || !password) {
                msg.code = 400;
                msg.message = 'false';
                msg.data = { error: `expected an object with username, password but got: ${params}` };
                ctx.body = msg;
                return;
            }

            //密码加密
            password = auth.getHash(password);
            console.log(password);
            ctx.body = { username: username, password: password };
            let sql = `INSERT INTO user set username='${username}', password='${password}'`;
            await query(sql);

            msg.code = 0;
            msg.message = 'success';
            msg.data = { token: auth.getToken({ username: username }) };
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
    //query和body 
    let params = ctx.request.query;
    if (JSON.stringify(params) === '{}') {
        params = ctx.request.body;
    }
    const username = params.username;
    const password = params.password;
    console.log('userLogin:', params);

    let msg = new Msg();
    try {
        if (!username || !password) {
            msg.code = 400;
            msg.message = 'false';
            msg.data = { error: `expected an object with username, password but got nothing` };
            ctx.body = msg;
            return;
        }
        const user = await query(`select * from user where username='${username}'`);
        if (user.length == 0) {
            msg.code = 401;
            msg.message = '用户名错误';
        } else {
            if (auth.getHash(password) == user[0].password) {
                msg.message = '登录成功';
                msg.data = { token: auth.getToken({ username: username }) };
                ctx.body = msg;
            } else {
                msg.code = 401;
                msg.message = '密码错误';
            }
        }
        console.log(msg);
        ctx.body = msg;
    } catch (error) {
        console.log('userLogin Error:', error);
        console.log(msg);
        msg.code = 401;
        msg.message = '登录时发生错误';
        msg.data = { error: error };
        ctx.body = msg;
    }
}

const login = async (ctx) => {
    await ctx.render('login', {})
}

const testlogin = async (ctx) => {
    let msg = new Msg();
    msg.code = 0;
    msg.message = 'success';
    ctx.body = msg;
}

const sessionlogin = async (ctx) => {
    //query和body 
    let params = ctx.request.query;
    if (JSON.stringify(params) === '{}') {
        params = ctx.request.body;
    }
    const username = params.username;
    const password = params.password;
    console.log('userLogin:', params);

    let msg = new Msg();
    try {
        if (!username || !password) {
            msg.code = 400;
            msg.message = 'false';
            msg.data = { error: `expected an object with username, password but got nothing` };
            ctx.body = msg;
            return;
        }
        const user = await query(`select * from user where username='${username}'`);
        if (user.length == 0) {
            msg.code = 401;
            msg.message = '用户名错误';
        } else {
            if (auth.getHash(password) == user[0].password) {
                msg.message = '登录成功';
                ctx.session.user = username;
                ctx.body = msg;
            } else {
                msg.code = 401;
                msg.message = '密码错误';
            }
        }
        console.log(msg);
        ctx.body = msg;
    } catch (error) {
        console.log('userLogin Error:', error);
        console.log(msg);
        msg.code = 401;
        msg.message = '登录时发生错误';
        msg.data = { error: error };
        ctx.body = msg;
    }
}

module.exports = { getAll, register, login, userLogin, sessionlogin };