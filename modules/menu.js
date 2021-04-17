// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;
const {
    Op
} = require("sequelize");

// 引入数据表模型
const Menu = Sequelize.import('../schema/menu.js');
Menu.sync({
    force: false
}); //自动创建表

class MenuModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    // 创建文章类别
    static async create(data) {
        return await Menu.create({
            name: data.name, 
            path: data.path,
            router_compent:data.router_compent,
            p_id:data.p_id,
            role_router:data.role_router
        });
    }
    // 更新文章类别
    static async update(data) {
        return await Menu.update({
            name: data.name, 
            path: data.path,
            router_compent:data.router_compent,
            p_id:data.p_id,
            role_router:data.role_router
        }, {
            where: {
                id: data.id
            }
        });
    }
    // 对文章进行删除
    static async del(id) {
        return await Menu.destroy({
            where: {
                id
            }
        });
    }
    
    // 对文章批量删除
    static async bacthDel(data) {
                return await Menu.destroy({
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
        return await Menu.findOne({
            where: {
                id
            }
        });
    }
    // 对文章类别进行搜索分页显示
    static async findAll(data) {
        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);

        return await Menu.findAndCountAll({
            //offet去掉前多少个数据
            offset,
            //limit每页数据数量
            limit: limit

        })
        

   

    }

    static async findAllMenu(data) {
    
        return await Menu.findAll({
            attributes: [['id','value'],['name','label'],'p_id'],
        })
        


    }

}

module.exports = MenuModel;