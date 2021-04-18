// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;
const {
    Op
} = require("sequelize");

// 引入数据表模型
const Component = Sequelize.import('../schema/Component.js');

const Component_type = Sequelize.import('../schema/component_type.js');

Component_type.hasMany(Component, {
    foreignKey: 'component_type_id',
    sourceKey: 'id',
    as:'children'
});
// Component.hasOne(Component_type, {
//     foreignKey: 'id',
//     sourceKey: 'component_type_id',
//     as:'children'
// });

Component.belongsTo(Component_type, {
    foreignKey: 'component_type_id'
});



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
    static async create(data) {
        return await Component.create({
            name: data.name, //标题
            other_name:data.other_name,
            component_type_id: data.component_type_id,
            component_pic:data.component_pic,
            option:data.option

        });
    }
    // 更新文章类别
    static async update(data) {
        return await Component.update({
            name: data.name, //标题
            other_name:data.other_name,
            component_type_id: data.component_type_id,
            component_pic:data.component_pic,
            option:data.option
        }, {
            where: {
                id: data.id
            }
        });
    }
    // 对文章进行删除
    static async del(id) {
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
    static async getDetail(id) {
        return await Component.findOne({
            where: {
                id
            }
        });
    }

    static async findComponentAndType(data) {
        return await Component_type.findAll({
            attributes: [['id','value'],['categoryName','label']],
            include: [{
                model: Component,
                attributes: [['id','value'],['name','label']],
                as:'children'
            }]
          
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
            include: [{
                model: Component_type
            }],
            //offet去掉前多少个数据
            offset,
            //limit每页数据数量
            limit: limit

        })
        
    }

}

module.exports = ComponentModel;