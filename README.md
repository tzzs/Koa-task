[TOC]

# 运行

## 环境

**node v7.6.0** 或 ES2015及更高版本和 async 方法支持.

## 运行

### 配置数据库
```js
//  配置文件 /configs/config.js
const config = {
    host: 'localhost', //数据库地址
    port: 3306, //数据库端口
    user: 'root', //数据库用户
    password: 'root', //数据库密码
    database: 'koa', //数据库名称   注：需要手动创建
    dataStrings: true
};

module.exports = config;
```

### 运行

会自动创建数据库表，以及插入模拟数据，提供 author0 到 author4 五位用户的登录，密码与账号相同

```bash
npm install
node app.js
```

浏览器访问 locahost:8080 或 127.0.0.1:8080

**页面在1920*1080分辨率下显示最佳**

# 页面路由

| URL                     | 页面         |
| ----------------------- | ------------ |
| /                       | 首页         |
| /login                  | 登录         |
| /signup                 | 注册         |
| /topic#page=publish-tab | 主题发布页面 |
| /topic#page=mange-tab   | 主题管理页面 |

# 接口

| URL           | Method | 描述             |
| ------------- | ------ | ---------------- |
| /signup       | post   | 用户注册         |
| /sessionlogin | post   | 用户session登录  |
| /testlogin    | get    | 测试用户登录     |
| /logout       | get    | 用户退出         |
| /addtopic     | put    | 添加留言主题     |
| /deletetopic  | delete | 删除留言主题     |
| /modifytopic  | post   | 修改留言主题     |
| /gettopic     | get    | 获取指定ID的留言 |
| /gettopics    | get    | 获取所有留言     |


# DEMO

## INDEX首页

![1557921909174](demo/1557921909174.png)

## 导航栏

![1557922171970](demo/1557922171970.png)

![1557922133192](demo/1557922133192.png)

## TOPIC 留言

![1557921949878](demo/1557921949878.png)

## 留言主题管理

![1557921981299](demo/1557921981299.png)

## 登录

![1557921994155](demo/1557921994155.png)

## 注册

![1557922043141](demo/1557922043141.png)

