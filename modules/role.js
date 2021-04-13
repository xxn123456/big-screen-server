// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;
const {
    Op
} = require("sequelize");

// 引入数据表模型
const Role = Sequelize.import('../schema/role.js');


Role.sync({
    force: false
}); //自动创建表

class RoleModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */ 
    // 创建文章类别
    static async create(data) {
        return await Role.create({
            name: data.name,
            role_router: data.role_router,
            role_screen: data.role_screen
        });
    }
    // 更新文章类别
    static async update(data) {
        return await Role.update({
            name: data.name,
            role_router: data.role_router,
            role_screen: data.role_screen
        }, {
            where: {
                id: data.id
            }
        });
    }
    // 对文章进行删除
    static async del(id) {
        return await Role.destroy({
            where: {
                id
            }
        });
    }
    
    // 对文章批量删除
    static async bacthDel(data) {
                return await Role.destroy({
                    where: {
                        id: data
                    }
                })
            }
    /**
     * 查询文章的详情
     * @param id 文章ID
     * @returns {Promise<Model>}
     */
    static async getDetail(id) {
        return await Role.findOne({
            where: {
                id
            }
        });
    }
    // 对文章类别进行搜索分页显示
    static async findAll(data) {
        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);

        let criteria = [];

        if(data.name){
            criteria.push({name:data.name})
        }
    
        return await Role.findAndCountAll({
            where: {
                [Op.and]:criteria
            },
            //offet去掉前多少个数据
            offset,
            //limit每页数据数量
            limit: limit

        })
        
    }

      // 查询所有角色
    static async findAllRole(data) {
    
        return await Role.findAll({})
        
    }

}

module.exports = RoleModel;