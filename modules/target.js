// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;
const {
    Op
} = require("sequelize");

// 引入数据表模型
const Target = Sequelize.import('../schema/target.js');
Target.sync({
    force: true
}); //自动创建表

class TargetModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    // 创建文章类别
    static async create(data) {
        return await Target.create({
            title:data.title,
            source_id:data.source_id,
            sql_order:data.sql_order,
            content:data.content
        });
    }

    // // 更新文章类别
    static async update(data) {
        return await Target.update({
            title:data.title,
            source_id:data.source_id,
            sql_order:data.sql_order,
            content:data.content
            
        }, {
            where: {
                id: data.id
            }
        });
    }
  
    static async del(id) {
        return await Target.destroy({
            where: {
                id
            }
        });
    }
    // // 对文章批量删除
    // static async bacthDel(data) {
    //             return await ArticleType.destroy({
    //                 where: {
    //                     id: data
    //                 }
    //             })
    //         }
    // /**
    //  * 查询文章的详情
    //  * @param id 文章ID
    //  * @returns {Promise<Model>}
    //  */
    static async getDetail(id) {
        return await Target.findOne({
            where: {
                id
            }
        });
    }
    // // 对文章类别进行搜索分页显示
    static async findAll(data) {
        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);

        let criteria = [];
        
        if(data.title){
            criteria.push({title:data.title})
           
        }

        if(data.source_id){
            criteria.push({host:data.source_id})
           
        }
        return await Target.findAndCountAll({
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

module.exports = TargetModel;