//功能处理
const userModule = require("../modules/user");

const jwt = require('jsonwebtoken');

//解析token
const tools = require('../public/tool')

//统一设置token有效时间  为了方便观察，设为10s
const expireTime = '2h'

class userController {
    //注册用户
    static async create(ctx) {
        let req = ctx.request.body;
        if (req.username && req.password) {
            const query = await userModule.getUserInfo(req.username);
            if (query) {
                ctx.response.status = 200;
                ctx.body = {
                    code: -1,
                    desc: '用户已存在'
                }
            } else {
                let user = await userModule.regist(req);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    desc: '用户注册成功',
                    data: user
                }
            }


        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: -1,
                desc: '参数不齐全'
            }
        }
    }

    static async update(ctx) {
        let req = ctx.request.body;

        
    
        try {

        let user = await userModule.update(req);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            desc: '用户修改成功',
            data: user
        }

           
            
        } catch (error) {

            ctx.response.status = 500;
            ctx.body = {
                code: 500,
                desc: '用户修改成功',
                data: error
            }
        
            
        }
    }

    // 登录用户
    static async login(ctx) {
        const req = ctx.request.body;
        if (!req.username || !req.password) {
            return ctx.body = {
                code: '-1',
                msg: '用户名或密码不能为空'
            }

        } else {
            const info = await userModule.getUserInfo(req.username);
            console.log("获取用户信息",info)
            if (info) {
                if (info.password === req.password) {
                    ctx.session.userInfo = req.username;
                    const token = jwt.sign({
                        user: req.username,
                        passWord: req.password
                    }, '123456', {
                        expiresIn: expireTime
                    });
                    return ctx.body = {
                        code: '200',
                        token: token,
                        desc: '登陆成功'
                    }
                } else {
                    return ctx.body = {
                        code: '-1',
                        desc: '用户密码错误'
                    }
                }
            } else {
                return ctx.body = {
                    code: '-1',
                    desc: '该用户尚未注册'
                }
            }
        };
    }
    // 修改用户密码
    static async updatePassword(ctx) {
        const req = ctx.request.body;
        if (req.id && req.password) {
            try {
                const data = await userModule.updatePassword(req);
                ctx.response.status = 200;
                return ctx.body = {
                    code: 0,
                    desc: '用户修改密码成功',
                    data
                }
            } catch (error) {
                ctx.response.status = 416;
                ctx.body = {
                    code: -1,
                    desc: '修改发生异常',
                    error
                }
            }
        }
    }

    //用户分页
    static async findAll(ctx) {
        const req = ctx.request.body;

        let data = await userModule.findAll(req);
        ctx.response.status = 200;
        return ctx.body = {
            code: 200,
            desc: '返回用户分页',
            data
        }
        // if (req.pageSize && req.currentPage) {
        //     try {
        //         let data = await userModule.findAll(req);
        //         ctx.response.status = 200;
        //         return ctx.body = {
        //             code: 200,
        //             desc: '返回用户分页',
        //             data
        //         }
        //     } catch (error) {
        //         ctx.response.status = 416;
        //         ctx.body = {
        //             code: -1,
        //             desc: '参数异常',
        //             error
        //         }
        //     }
        // }
    }

    // 获取用户信息

    static async getUserInfo(ctx) {
        const token = ctx.headers.authorization;
       
        if (token) {
            try {
                let result = await tools.verToken(token);
                let data = await userModule.getUserInfo(result.user);
                ctx.status = 200;
                return ctx.body = {
                    code: '200',
                    desc: '获取用户信息成功',
                    data
                }
            } catch (error) {
                ctx.status = 401;
                return ctx.body = {
                    code: '-1',
                    desc: 'token失效，请重新拉去'
                }
            }
        } else {
            ctx.status = 401;
            return ctx.body = {
                code: '-1',
                desc: 'token,不存在请重新输入'
            }
        }
    }

    // 删除用户
    static async delUser(ctx) {
        const req = ctx.request.body;
        if (req.id) {
            try {
                let data = await userModule.delUser(req.id);
                return ctx.body = {
                    code: '200',
                    desc: '删除用户成功',
                    data
                }
            } catch (error) {
                ctx.status = 416;
                return ctx.body = {
                    code: '-1',
                    desc: '服务器异常删除失败',
                    error
                }
            }
        } else {
            ctx.status = 200;
            return ctx.body = {
                code: '-1',
                desc: '用户id不能为空',
                error
            }
        }
    }


}

module.exports = userController;