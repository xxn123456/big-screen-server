// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;
const {
    Op
} = require("sequelize");

// 引入数据表模型
const Component = Sequelize.import('../schema/Component.js');
Component.sync({
    force: false
}); //自动创建表

class ComponentModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    // 创建文章类别
    static async createComponent(data) {
        return await Component.create({
            categoryName: data.categoryName, //标题
            categoryCreater: data.categoryCreater
        });
    }
    // 更新文章类别
    static async upDataComponent(data) {
        return await Component.update({
            categoryName: data.categoryName, //标题
            categoryCreater: data.categoryCreater
        }, {
            where: {
                id: data.id
            }
        });
    }
    // 对文章进行删除
    static async delComponent(id) {
        return await Component.destroy({
            where: {
                id
            }
        });
    }
    
    // 对文章批量删除
    static async bacthDel(data) {
                return await Component.destroy({
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
    static async getComponentDetail(id) {
        return await Component.findOne({
            where: {
                id
            }
        });
    }
    // 对文章类别进行搜索分页显示
    static async finAllComponent(data) {
        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);

        let criteria = [];

        if(data.categoryName){
            criteria.push({categoryName:data.categoryName})
           
        }
        if(data.startTime||data.endTime){
            criteria.push({
                            
                createdAt: {
                    [Op.between]: [new Date(data.startTime), new Date(data.endTime)]

                }
            })
           
        }

        return await Component.findAndCountAll({
            
            where: {
                [Op.and]:criteria
            
            },
            //offet去掉前多少个数据
            offset,
            //limit每页数据数量
            limit: limit

        })
        

   

    }

}

module.exports = ComponentModel;