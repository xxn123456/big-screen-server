const LogSure = require('../schema/log.js');

class LogModel {

    static async add(content) {
    
        await  LogSure.create(content);
    }

    static async queryTotal(data) {


        let criteria = [];
        

        if (data.nickname) {
            criteria.push({
                nickname: data.nickname
            })
        }

        if (data.startTime || data.endTime) {
            criteria.push({
                createdAt: {
                    $gt: new Date(data.startTime),
                    $lt: new Date(data.endTime)
                }
            })
        }


        if (criteria.length != 0) {
            return await LogSure.find({
                $and: criteria
            }).count()
        } else {
            return await LogSure.find().count()
        }

    }


    static async findAll(data) {
        let currentPage = parseInt(data.currentPage);
        let pageSize = parseInt(data.pageSize);

        let criteria = [];

        if (data.nickname) {
            criteria.push({
                nickname: data.nickname
            })
        }
        
        if (data.startTime || data.endTime) {
            criteria.push({
                createdAt: {
                    $gt: new Date(data.startTime),
                    $lt: new Date(data.endTime)
                }
            })
        }

        if (criteria.length != 0) {
            return await LogSure.find({
                $and: criteria
            }).skip((currentPage - 1) * pageSize).limit(pageSize)
        } else {
            return await LogSure.find().skip((currentPage - 1) * pageSize).limit(pageSize)
        }


    }




}

module.exports = LogModel;