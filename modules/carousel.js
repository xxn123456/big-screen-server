// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;
const {
    Op
} = require("sequelize");

// 引入数据表模型
const Carousel = Sequelize.import('../schema/carousel.js');
Carousel.sync({
    force: false
}); //自动创建表

class CarouselModel {
    /**
     * 创建文章模型
     * @param data
     * @returns {Promise<*>}
     */
    // 创建文章类别
    static async create(data) {
        console.log("传递的文件模型",data)
        return await Carousel.create({
            pic: data.pic, //
            url: data.url,
            title: data.title,
            userId: data.userId,
            active:data.active
        });
    }
    // 更新文章类别
    static async upDate(data) {
        return await Carousel.update({
            pic: data.pic, //
            url: data.url,
            title:data.title,
            userId:data.userId,
            active:data.active
        }, {
            where: {
                id: data.id
            }
        });
    };




    // 对文章进行删除
    static async del(id) {
        return await Carousel.destroy({
            where: {
                id
            }
        });
    }
    
    // 对文章批量删除
    static async bacthDel(data) {
                return await Carousel.destroy({
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

    static async detail(id) {
        return await Carousel.findOne({
            where: {
                id
            }
        });
    }

    static async queryCarousel(active) {
        return await Carousel.findOne({
            where: {
                active
            }
        });
    }

    // 对文章类别进行搜索分页显示
    static async finAll(data) {
        let offset = 0;
        let limit = 5;
        return await Carousel.findAndCountAll({
            'order': [
                ['active','ASC'],
            ],
            //offet去掉前多少个数据
            offset,
            //limit每页数据数量
            limit: limit

        })
        

   

    }

}

module.exports = CarouselModel;