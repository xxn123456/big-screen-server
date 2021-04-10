const Music = require('../schema/music.js');


class musicModel {

    /**
     * 通过菜单id 查询菜单信息
     * @param id 文章ID
     * @returns {Promise<Model>}
     */
    static async create(data) {


        return await Music.create({
            // 邮箱
            author: data.author,
            // 验证码
            name: data.name,

            url: data.url
        });

    }

    static async update(data) {
        let criteria={};
        if(data.author){
            criteria['author']=data.author
        }
        if(data.name){
            criteria['name']=data.name
        }
        if(data.url){
            criteria['url']=data.url
        }
    
        return await Music.updateOne({
            _id: data.id
        },criteria);

    }

    static async del(data) {

        return await Music.deleteOne({
            _id: data.id
        })

    }

     static async queryTotal(data) {

                
                let criteria=[];
                if(data.name){
                    criteria.push({
                        name: data.name
                    })
                }
                if(data.startTime||data.endTime){
                    criteria.push({
                        createdAt: {
                            $gt: new Date(data.startTime),
                            $lt: new Date(data.endTime)
                        }
                    })
                }
               
               
                if(criteria.length != 0){
                    return await Music.find(
                        { $and: criteria}
                      ).count()
                }else{
                    return await Music.find().count()
                }

    }

     static async findAll(data) {
                let currentPage = parseInt(data.currentPage);
                let pageSize = parseInt(data.pageSize);
                
                let criteria=[];
                if(data.name){
                    criteria.push({
                        name: data.name
                    })
                }
                if(data.startTime||data.endTime){
                    criteria.push({
                        createdAt: {
                            $gt: new Date(data.startTime),
                            $lt: new Date(data.endTime)
                        }
                    })
                }
               
               
                if(criteria.length != 0){
                    return await Music.find(
                        { $and: criteria}
                      ).skip((currentPage - 1) * pageSize).limit(pageSize)
                }else{
                    return await Music.find().skip((currentPage - 1) * pageSize).limit(pageSize)
                }
               
               
            }






}

module.exports = musicModel;