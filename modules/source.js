// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;
const {
    Op
} = require("sequelize");


const Source = Sequelize.import('../schema/source.js');

const Source_type = Sequelize.import('../schema/source_type.js');

Source.hasMany(Source_type, {
    foreignKey: 'id',
    sourceKey: 'source_type_id',
    as:'children'
});

const Users = Sequelize.import('../schema/users.js'); 

const Foods = Sequelize.import('../schema/foods.js');

const Class = Sequelize.import('../schema/class.js');


Class.hasOne(Users, {
    foreignKey: 'id',
    sourceKey: 'user_id',
    as:'children'
});


Users.hasMany(Foods, {
    foreignKey: 'id',
    sourceKey: 'food_id',
    as:'children'
});



Users.sync({
    force: false
}); //自动创建表

Foods.sync({
    force: false
}); //自动创建表
Class.sync({
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
            title: data.title,
            source_type_id: data.source_type_id,
            sql_user: data.sql_user,
            sql_pass: data.sql_pass,
            host: data.host,
            port: data.port,
            time_zone: data.time_zone
        });
    }

    // // 更新文章类别
    static async update(data) {
        return await Source.update({
            title: data.title,
            source_type_id: data.source_type_id,
            sql_user: data.sql_user,
            sql_pass: data.sql_pass,
            host: data.host,
            port: data.port,
            time_zone: data.time_zone

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

    static async getDetail(id) {
        return await Source.findOne({
            where: {
                id
            }
        });
    }
    // // 对文章类别进行搜索分页显示
    static async findAll(data) {
        Source.belongsTo(Source_type, {
            foreignKey: 'source_type_id'
        });
        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);

        let criteria = [];

        if (data.title) {
            criteria.push({
                title: data.title
            })

        }

        if (data.host) {
            criteria.push({
                host: data.host
            })

        }
        return await Source.findAndCountAll({
            where: {
                [Op.and]: criteria

            },
            include: [{
                model: Source_type
            }],
            //offet去掉前多少个数据
            offset,
            //limit每页数据数量
            limit: limit

        })




    }

    static async findSourceAndType(data) {
        return await Class.findAll({
            include: [{
                model: Users,
                as:'children',
                include: [{
                    model: Foods,
                    as:'children'
                }]
                
            }]
        })
    
        // return await Source.findAll({
        //     attributes: [['id','value'],['title','label']],
        //     include: [{
        //         model: Source_type,
        //         attributes: [['id','value'],['catename','label']],
        //         as:'children'
        //     }],
        // });
    }



}

module.exports = SourceModel;