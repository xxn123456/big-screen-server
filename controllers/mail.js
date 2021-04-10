// 使用邮件中间件
const nodemailer = require("nodemailer");
const fs = require("fs");

const path = require("path");

const MailModel = require("../modules/mail");

class mailController {

    /**
     * 创建验证码
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async sendMail(ctx) {

        let req = ctx.request.body;
        console.log("执行1",req.mail)

        if (req.mail) {
            console.log("mail")
            try {
                let code = Math.random().toString().substr(2, 4);

                let transporter = nodemailer.createTransport({
                    // host: 'smtp.ethereal.email',
                    service: "qq", // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
                    //   port: 465, // SMTP 端口
                    secureConnection: true, // 使用了 SSL
                    auth: {
                        user: "2363577442@qq.com",
                        pass: "yvxlcezibyvjdibi", //授权码，并非QQ密码
                    },
                });
                let mailOptions = {
                    from: '"薯条"<2363577442@qq.com>', // 发送地址
                    to: "1936585499@qq.com", // 接收列表（可多个）
                    subject: "新年新气象,湖北-武汉薯条", // 主题
                    // 发送text或者html格式（任选一个）
                    // text: 'Hello world！', // plain text body
                    // text: `您的验证码是${code},验证码在10分钟内有效`
                    html: fs.createReadStream(path.resolve('public', 'index.html'))
                    // html: '<img src="cid:01">',
                    // attachments: [ //添加附件（可多个）
                    //     {
                    //         filename: "image",
                    //         path: path.resolve('public', "images/1594742236743.jpeg"),
                    //         cid: "01", //与上面的图片cid对应
                    //     },
                    //     {
                    //         filename: "a.xlsx",
                    //         content: "hello world!",
                    //         path: path.resolve('public', "a.xlsx"), //根目录新建即可
                    //     }
                    // ],
                };

                const regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/ //验证邮箱正则

                if (regEmail.test(req.mail)) {
                    // 发送邮件
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        // console.log(info);
                        // setTimeout(async() => {
                        //     await MailModel.delMailCode(req.mail);
                        //     console.log("删除原本验证码");
                        // }, 1000 * 60 * 3);
                    });

                    // let regMsg = {
                    //     mail: req.mail,
                    //     // 验证码
                    //     code: code
                    // }
                    // const rgeData = await MailModel.creatMail(regMsg);


                    // ctx.response.status = 200;
                    ctx.body = {
                        code: 200,
                        msg: '创建邮件成功',
                        data: "111"
                    }

                } else {
                    ctx.response.status = 403;
                    ctx.body = {
                        code: 200,
                        msg: '请输入正确邮箱格式'
                    }

                }


               



            } catch (err) {
                ctx.response.status = 502;
                ctx.body = {
                    code: 200,
                    msg: err
                }

            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全'
            }
        }
    }
    static async verityMail(ctx) {


        let req = ctx.request.body;

        if (req.mail) {

            try {
                const mailAbout = await MailModel.vertyMailcode(req.mail);

                if (mailAbout != null) {
                    if (req.code == mailAbout.code) {
                        ctx.response.status = 200;
                        ctx.body = {
                            code: 200,
                            msg: '邮箱验证成功'
                        }

                    } else {
                        ctx.response.status = 200;
                        ctx.body = {
                            code: 401,
                            msg: '验证码错误'
                        }
                    }

                } else {
                    ctx.response.status = 200;
                    ctx.body = {
                        code: 401,
                        msg: '验证码过期'
                    }
                }
            } catch (err) {
                ctx.response.status = 502;
                ctx.body = {
                    code: 200,
                    msg: err
                }

            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全'
            }
        }
    }



}

module.exports = mailController;