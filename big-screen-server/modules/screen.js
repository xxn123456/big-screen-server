// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;
const {
    Op
} = require("sequelize");

// 引入数据表模型
const Screen = Sequelize.import('../schema/screen.js');
Screen.sync({
    force: false
}); //自动创建表


const User = Sequelize.import('../schema/user');

Screen.belongsTo(User,{foreignKey:'user_id'});

class ScreenModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    // 创建文章类别
    static async create(data) {
        return await Screen.create({
            title: data.title, //标题
            conver:data.conver,
            layout:data.layout,
            user_id:data.user_id
        });
    }
    // 更新文章类别
    static async update(data) {
        return await Screen.update({
            title: data.title, //标题
            conver:data.conver,
            layout:data.layout,
            user_id:data.user_id
        }, {
            where: {
                id: data.id
            }
        });
    }
    // 对文章进行删除
    static async del(id) {
        return await Screen.destroy({
            where: {
                id
            }
        });
    }
    
    // 对文章批量删除
    static async bacthDel(data) {
                return await Screen.destroy({
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
        return await Screen.findOne({
            where: {
                id
            }
        });
    }

    static async findAllScreen(data) {
        return await Screen.findAll({
            attributes: [['id','value'],['title','label']],
        });
        
    }
    // 对文章类别进行搜索分页显示
    static async findAll(data) {
        let offset = data.pageSize * (data.currentPage - 1);
        let limit = parseInt(data.pageSize);

        let criteria = [];
        if(data.name){
            criteria.push({name:data.name}); 
        }

        if(data.startTime||data.endTime){
            criteria.push({
                            
                createdAt: {
                    [Op.between]: [new Date(data.startTime), new Date(data.endTime)]

                }
            })
           
        }

        return await Screen.findAndCountAll({
            
            where: {
                [Op.and]:criteria
            
            },
            include: [{   
                                 model: User,
                                 attributes: { exclude: ['password'] }
                            }],
            //offet去掉前多少个数据
            offset,
            //limit每页数据数量
            limit: limit

        })
        

   

    }

}

module.exports = ScreenModel;