// 引入mysql的配置文件
const db = require('../config/db');

const {
    Source_conect
} = require("../util/mysql_conect.js")

// 引入sequelize对象
const Sequelize = db.sequelize;
const {
    Op
} = require("sequelize");

// 引入数据表模型
const Target = Sequelize.import('../schema/target.js');


const Target_type = Sequelize.import('../schema/target_type.js');


Target.belongsTo(Target_type, {
    foreignKey: 'target_type_id'
});

const Source = Sequelize.import('../schema/source.js');

Target.belongsTo(Source, {
    foreignKey: 'source_id'
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

    static async query_table(data) {

        let opt = {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'yjh123456',
            database: 'koa_error',
            useConnectionPooling: true,
        };
        let source_conect = new Source_conect(opt);
        let sql = `select * from information_schema.columns
        where table_name = 'user';`;

        return await source_conect.Query(sql);

    }



    // 获取指标

    static async query_mysql(data) {

        let opt = {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'yjh123456',
            database: 'koa_error',
            useConnectionPooling: true,
        };
        let source_conect = new Source_conect(opt);
        let sql = `select * from user;`;

        return await source_conect.Query(sql);

    }


    // 数据库连接测试
    static async conect_mysql(data) {
        let opt = {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: 'yjh123456',
            database: 'koa_error',
            useConnectionPooling: true,
        };
        let source_conect = new Source_conect(opt);


        return await source_conect.test();


    }




    // 创建文章类别
    static async create(data) {


        return await Target.create({
            title: data.title,
            target_type_id: data.target_type_id,
            source_id: data.source_id,
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