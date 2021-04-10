// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

const ey_article = Sequelize.import('../schema/ey_article.js');

const ey_user = Sequelize.import('../schema/ey_user.js');

const blog = Sequelize.import('../schema/blog.js');

const blogType = Sequelize.import('../schema/articleType.js');

ey_article.sync({
    force: false
}); //自动创建表

ey_user.sync({
    force: false
}); //自动创建表





class BlogModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    // 创建文章类别
   

    // 对文章类别进行搜索分页显示
    static async findAll(data) {
    
    //     ey_article.hasOne(ey_user,{ foreignKey: 'id', targetKey: 'uid' });

    //     let bb = await ey_article.findAll({
    //                include: [{   
    //                     model: ey_user
    //                }]

       
    //     });

    blog.hasOne(blogType,{ foreignKey: 'id', targetKey: 'articleTypeId' });


    let bb = await blog.findAll({
               include: [{   
                    model: blogType
               }]

   
    });

        console.log("bb-----------------",bb)

        return  bb
    }

}

module.exports = BlogModel;