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
        let msg = await userModule.userRegist();
        ctx.body = {
            code: 0,
            desc: '用户注册成功',
            about: msg
        }

        // const req = ctx.request.body;
        // if (req.userName && req.password) {
        //     try {
        //         const query = await userModule.getUserInfo(req.userName);
        //         if (query) {
        //             ctx.response.status = 200;
        //             ctx.body = {
        //                 code: -1,
        //                 desc: '用户已存在'
        //             }
        //         } else {
        //             const param = {
        //                 password: req.password,
        //                 userName: req.userName,
        //                 userName: req.userName
        //             }
        //             const data = await userModule.userRegist(param);

        //             ctx.response.status = 200;
        //             ctx.body = {
        //                 code: 0,
        //                 desc: '用户注册成功',
        //                 userInfo: {
        //                     userName: req.userName
        //                 }
        //             }
        //         }

        //     } catch (error) {
        //         ctx.response.status = 416;
        //         ctx.body = {
        //             code: -1,
        //             desc: '参数不齐全'
        //         }
        //     }
        // }
    }
   
    // 登录用户
    static async login(ctx) {
        const req = ctx.request.body;
        if (!req.userName || !req.password) {
            return ctx.body = {
                code: '-1',
                msg: '用户名或密码不能为空'
            }
        } else {
            const info = await userModule.getUserInfo(req.userName);
            if (info) {
                if (info.password === req.password) {
                    ctx.session.userInfo = req.userName;
                    const token = jwt.sign({
                        user: req.userName,
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
        if (req.userId && req.password) {
            try {
                const param = {
                    password: req.password,

                    userId: req.userId
                }
                const data = await userModule.updatePassword(param);

                ctx.response.status = 200;
                if (data == 0) {
                    return ctx.body = {
                        code: 0,
                        desc: '用户修改密码成功',
                    }
                }


            } catch (error) {
                ctx.response.status = 416;
                ctx.body = {
                    code: -1,
                    desc: '参数异常'
                }
            }
        }
    }

    //用户分页
    static async page(ctx) {
        const req = ctx.request.body;

        if (req.page && req.pageSize) {
            try {
                const param = {
                    page: req.page,
                    pageSize: req.pageSize,
                    userName: req.userName
                }

                console.log("查找用户分页信息");
                const data = await userModule.page(param);

                console.log(data.rows);


                if (data.rows) {
                    return ctx.body = {
                        code: 200,
                        desc: '返回用户分页',
                        info: data.rows
                    }
                }


            } catch (error) {
                ctx.response.status = 416;
                ctx.body = {
                    code: -1,
                    desc: '参数异常'
                }
            }
        }
    }
 
    // 获取用户信息

    static async getUserInfo(ctx) {
        const token = ctx.headers.authorization;
        console.log("是否获取到token",token)
        if (token) {
            try {
                console.log("开始校验token")
                const result = await tools.verToken(token);

                console.log("解析的用户信息",result)

                let data = await userModule.getUserInfo(result.user);
               
                const info = {
                    userId: data.userId,
                    userName: data.userName,
                    avatar:data.avatar
                   
                };
                ctx.status = 200;

                return ctx.body = {
                    code: '200',
                    userInfo: info,
                    desc: '获取用户信息成功'
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

    static async queryUserBook(ctx) {

        const req = ctx.request.body;
        const token = ctx.headers.authorization;
        if (token) {
            try {

                console.log("查找到的书籍");
                let data = await userModule.queryUserBook(req.userId);
                return ctx.body = {
                    code: '200',
                    data: data,
                    desc: '获取用户发表文章成功'
                }
            } catch (error) {
                console.log("查询失败------");
                ctx.status = 401;
                return ctx.body = {
                    code: '-1',
                    desc: '查找用户书籍失败'
                }
            }
        } else {
            ctx.status = 401;
            return ctx.body = {
                code: '-1',
                desc: '登陆过期，请重新登陆'
            }
        }
    }

    // 删除用户
    static async delUser(ctx) {
        const req = ctx.request.body;
        const token = ctx.headers.authorization;
        if (token) {
            try {

                console.log(req.userId);

                let data = await userModule.delUser(req.userId);
                console.log("删除情况")
                console.log(data)


                return ctx.body = {
                    code: '200',

                    desc: '删除用户成功'
                }
            } catch (error) {
                ctx.status = 401;
                return ctx.body = {
                    code: '-1',
                    desc: '服务器异常删除失败'
                }
            }
        } else {
            ctx.status = 401;
            return ctx.body = {
                code: '-1',
                desc: '登陆过期，请重新登陆'
            }
        }
    }

    static async findUsers(ctx) {

        const token = ctx.headers.authorization;
        if (token) {
            try {
                let data = await userModule.findUsers();

                console.log(data)


                return ctx.body = {
                    code: '200',
                    users: data,
                    desc: '删除用户成功'
                }
            } catch (error) {
                ctx.status = 401;
                return ctx.body = {
                    code: '-1',
                    desc: '服务器异常删除失败'
                }
            }
        } else {
            ctx.status = 401;
            return ctx.body = {
                code: '-1',
                desc: '登陆过期，请重新登陆'
            }
        }
    }
    static async UserbulkCreate(ctx) {


        try {

            let msg = await userModule.UserbulkCreate(data);

            console.log(msg)


            return ctx.body = {
                code: '200',
                users: msg,
                desc: '删除用户成功'
            }
        } catch (error) {
            ctx.status = 401;
            return ctx.body = {
                code: '-1',
                desc: '服务器异常删除失败'
            }
        }
    }
    static async UserbulkUpdata(ctx) {


        try {

            let data = [{
                userId: 15,
                password: "112222222"
            }, {
                userId: 16,
                password: "112222222"
            }]
            for (let i = 0; i < data.length; i++) {
                let msg = await userModule.UserbulkUpdata(data[i]);
            }

            return ctx.body = {
                code: '200',
                users: "ss",
                desc: '删除用户成功'
            }
        } catch (error) {
            ctx.status = 401;
            return ctx.body = {
                code: '-1',
                desc: '服务器异常删除失败'
            }
        }
    }
    static async douban(ctx) {


        try {

            let data = await userModule.douban()

            return ctx.body = {
                code: '200',
                users: data,
                desc: '删除用户成功'
            }
        } catch (error) {
            ctx.status = 401;
            return ctx.body = {
                code: '-1',
                desc: '服务器异常删除失败'
            }
        }
    }




}

module.exports = userController;