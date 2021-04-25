// 引入mysql的配置文件
const db = require('../config/db');



// 引入sequelize对象
const Sequelize = db.sequelize;

const {
    Op
} = require("sequelize");

// 引入数据表模型
const Target = Sequelize.import('../schema/target.js');


// 指标类型
const Target_type = Sequelize.import('../schema/target_type.js');


Target.belongsTo(Target_type, {
    foreignKey: 'target_type_id'
});


// 数据源
const Source = Sequelize.import('../schema/source.js');

Target.belongsTo(Source, {
    foreignKey: 'source_id'
});

// 数据源类型


const Source_type = Sequelize.import('../schema/source_type.js');

Target.belongsTo(Source_type, {
    foreignKey: 'source_type_id'
});










Target.sync({
    force: false
}); //自动创建表




class TargetModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     * 
     */

    // 获取数据库表结构


    // 创建文章类别
    static async create(data) {
      
        return await Target.create({
            title:data.title,
            target_type_id:data.target_type_id,
            source_id: data.source_id,
            source_type_id:data.source_type_id,
            sql_order: data.sql_order,
            content: data.content
        });
    }

    // // 更新文章类别
    static async update(data) {
        return await Target.update({
            title: data.title,
            target_type_id: data.target_type_id,
            source_id: data.source_id,
            source_type_id:data.source_type_id,
            sql_order: data.sql_order,
            content: data.content

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
            },
            include: [
                {
                    model: Target_type
                },
                {
                    model: Source
                },
                {
                     model: Source_type
                }
                
            ],
        });
    }
    // // 对文章类别进行搜索分页显示
    static async findAll(data) {
        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);

        let criteria = [];

        if (data.title) {
            criteria.push({
                title: data.title
            })

        }

        if (data.source_id) {
            criteria.push({
                host: data.source_id
            })

        }
        return await Target.findAndCountAll({
            where: {
                [Op.and]: criteria

            },
            include: [
                {
                    model: Target_type
                },
                {
                    model: Source
                },
                {
                    model: Source_type
               }
                
            ],
            //offet去掉前多少个数据
            offset,
            //limit每页数据数量
            limit: limit

        })




    }

}

module.exports = TargetModel;