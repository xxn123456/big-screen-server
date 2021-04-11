// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;
const {
    Op
} = require("sequelize");

// 引入数据表模型
const Component_type = Sequelize.import('../schema/component_type.js');
Component_type.sync({
    force: false
}); //自动创建表

class ComponentTypeModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    // 创建文章类别
    static async create(data) {
        return await Component_type.create({
            categoryName: data.categoryName, //标题
            categoryCreater: data.categoryCreater
        });
    }
    // 更新文章类别
    static async upDate(data) {
        return await Component_type.update({
            categoryName: data.categoryName, //标题
            categoryCreater: data.categoryCreater
        }, {
            where: {
                id: data.id
            }
        });
    }
    // 对文章进行删除
    static async del(id) {
        return await Component_type.destroy({
            where: {
                id
            }
        });
    }
    
    // 对文章批量删除
    static async bacthDel(data) {
                return await Component_type.destroy({
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
        return await Component_type.findOne({
            where: {
                id
            }
        });
    }
    // 对文章类别进行搜索分页显示
    static async finAll(data) {
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

        return await Component_type.findAndCountAll({
            
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

module.exports = ComponentTypeModel;