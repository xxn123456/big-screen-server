// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;


const ey_article = Sequelize.import('../schema/ey_article.js');

const ey_user = Sequelize.import('../schema/ey_user.js');



class BlogModel {
   
    // 对文章类别进行搜索分页显示
    static async findAll(data) {
        ey_article.hasOne(ey_user,{ foreignKey: 'id', targetKey: 'uid' });

        let bb = await ey_article.findAll({
                   include: [{   
                        model: ey_user
                   }]

       
        });

        return bb
    }

}

module.exports = BlogModel;