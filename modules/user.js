//引入db配置
const db = require('../config/db')

//引入sequelize对象
const Sequelize = db.sequelize;

const {
    Op
} = require("sequelize");

//引入数据表模型
const user = Sequelize.import('../schema/user');

const Role = Sequelize.import('../schema/role.js');


user.belongsTo(Role, {
    foreignKey: 'role_id'
});




//自动创建表
user.sync({
    force: false
});

//数据库操作类
class userModule {
    static async regist(data) {
        return await user.create({
            username: data.username,
            password: data.password,
            avatar: data.avatar,
            role_id: data.role_id
        })
    }

    static async update(data) {
       
        return await user.update({
            avatar: data.avatar,
            role_id: data.role_id
        },{
            where: {
                id:data.id
            }
        })
    }



    static async findAll(data) {

        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);
        let criteria = {};
        if (data.username) {
            criteria['username'] = {
                [Op.like]: `%${data.username}%`
            }
        };
        return await user.findAndCountAll({
            where: criteria,
            include: [{
                model: Role
            }],
            //offet去掉前多少个数据
            offset,
            //limit每页数据数量
            limit: limit

        })

    }
    static async updatePassword(data) {
        return await user.update({
            password: data.password
        }, {
            where: {
                id: data.id
            }
        })
    }

    static async getUserInfo(username) {

        return await user.findOne({
            where: {
                username
            },
            include: [{
                model: Role
            }],
            exclude: ['password'] 
        })
    }

    static async delUser(id) {
        return await user.destroy({
            where: {
                id
            }
        })
    }


}
module.exports = userModule;