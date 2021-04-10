// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;
const {
    Op
} = require("sequelize");

// 引入数据表模型
const Source = Sequelize.import('../schema/source_mysql.js');
Source.sync({
    force: false
}); //自动创建表

class SourceModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    // 创建文章类别
    static async create(data) {
        return await Source.create({
            title:data.title,
            sql_user:data.sql_user,
            sql_pass:data.sql_pass,
            host:data.host,
            port:data.port,
            time_zone:data.time_zone
        });
    }

    // // 更新文章类别
    static async update(data) {
        return await Source.update({
            title:data.title,
            sql_user:data.sql_user,
            sql_pass:data.sql_pass,
            host:data.host,
            port:data.port,
            time_zone:data.time_zone
            
        }, {
            where: {
                id: data.id
            }
        });
    }
  
    static async del(id) {
        return await Source.destroy({
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
        return await Source.findOne({
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

        if(data.host){
            criteria.push({host:data.host})
           
        }
        return await ArticleType.findAndCountAll({
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

module.exports = SourceModel;