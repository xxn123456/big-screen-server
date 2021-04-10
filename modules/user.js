//引入db配置
const db = require('../config/db')

//引入sequelize对象
const Sequelize = db.sequelize

//引入数据表模型
const user = Sequelize.import('../schema/user')



const request = require('request')

const Querystring = require('querystring');
    //自动创建表
user.sync({
    force: false
});

//数据库操作类
class userModule {

    static async userRegist(data) {
        // return await user.create({
        //     password: data.password,
        //     userName: data.userName
        // })

        // return user.findAll({
        //     limit: 1,
        //     lock: true,
        //     transaction: t1
        //   });

        
       

        return Sequelize.transaction(function (t) {

       

 
            // 在这里链接您的所有查询。 确保你返回他们。
            // return user.create({
            //     password: 'Abraham',
            //     userName: 'Lincoln'
            // }, {transaction: t}).then(function () {
            //   return user.update({
            //     userName: '10086',
            //     password:"111"
            //   }, {
            //                 where: {
            //                     userId: '1'
            //                 }
            //             }, {transaction: t});
            // });
           
          }).then(function (result) {
              console.log("事务成功");
            // 事务已被提交
            // result 是 promise 链返回到事务回调的结果
          }).catch(function (err) {
              console.log("事务失败2",err)
            // 事务已被回滚
            // err 是拒绝 promise 链返回到事务回调的错误
          });
    }
    static async page(data) {
        console.log(data);
        let offset = data.pageSize * (data.page - 1);
        let limit = parseInt(data.page);

        return await user.findAndCountAll({
            // where: {
            //     userName: userName
            // },
            //offet去掉前多少个数据
            offset,
            //limit每页数据数量
            limit: limit
        })
    }
    static async updatePassword(data) {
        return await user.update({
            password: data.password
        }, {
            where: {
                userId: data.userId
            }
        })
    }


    static async getUserInfo(userName) {
        return await user.findOne({
            where: {
                userName
            }
        })
    }
    static async queryUserBook(id) {
    }
    static async delUser(userId) {
        return await user.destroy({
            where: {
                userId
            }
        })
    }
    static async findUsers() {
            return await user.findAll()
        }
        // 批量操作

    static async UserbulkCreate(data) {
        return await user.bulkCreate(data)
    }

    static async UserbulkUpdata() {
        return await user.update({
            password: "zmkkkk"

        }, {
            where: {
                userId: [13, 14]
            }
        })
    }

    static async douban() {
        return new Promise((resolve, reject) => {
            request('http://www.baidu.com', function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body)
                }
            });
        })



    }

}
module.exports = userModule;