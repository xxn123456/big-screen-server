const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const Mail = Sequelize.import('../schema/mail');
Mail.sync({ force: false }); //自动创建表

class MailModel {


    /**
     * 通过菜单id 查询菜单信息
     * @param id 文章ID
     * @returns {Promise<Model>}
     */
    static async creatMail(data) {
        return await Mail.create({
            // 邮箱
            email: data.mail,
            // 验证码
            code: data.code
        });
    }
    static async vertyMailcode(mail) {
        return await Mail.findOne({
            where: {
                email: mail
            }
        });
    }
    static async delMailCode(mail) {
        return await Mail.destroy({
            where: {
                email: mail
            }
        })
    }

}

module.exports = MailModel;