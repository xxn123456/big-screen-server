// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;
const {
    Op
} = require("sequelize");

// 引入数据表模型
// 引入数据表模型
const Target_type = Sequelize.import('../schema/target_type.js');
Target_type.sync({
    force: false
}); //自动创建表

class Target_typeModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    // 创建文章类别
    static async create(data) {
        return await Target_type.create({
            title:data.title
        });
    }

    // // 更新文章类别
    static async update(data) {
      
        return await Target_type.update({
            title:data.title
            
        }, {
            where: {
                id: data.id
            }
        });
    }
  
    static async del(id) {
        return await Target_type.destroy({
            where: {
                id
            }
        });
    }
  
    static async getDetail(id) {
        return await Target_type.findOne({
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
        return await Target_type.findAndCountAll({
            where: {
                [Op.and]:criteria
        
            },
            //offet去掉前多少个数据
            offset,
            //limit每页数据数量
            limit: limit

        })
        

   

    }

    static async findAllSoureType(data) {
    
        return await Target_type.findAll({})
    
    }

}

module.exports = Target_typeModel;
