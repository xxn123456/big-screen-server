const Person = require('../schema/mgdb.js');
const studentClass=require('../schema/class.js')












class PersionModel {

    /**
     * 通过菜单id 查询菜单信息
     * @param id 文章ID
     * @returns {Promise<Model>}
     */
    static async creatPerson(data) {
        // return studentClass.aggregate([{
        //     $lookup:{
        //         from:"person",
        //         localField:"_id",
        //         foreignField:"class_id",
        //         as:"item"
        //     },
        //     $lookup:{
        //         from:"person2",
        //         localField:"_id",
        //         foreignField:"class_id",
        //         as:"item"
        //     }
        // }],(err, docs) => {
        //     if (err) return console.log(err)
        //     console.log(JSON.stringify(docs))
        // });

        // return await Person.count()

        // let count=await Person.count();
        // let recover=await Person.find({name:data.name}).skip((data.page - 1)*parseInt(2)).limit(2);

        // let dataR={
        //     "count":count,
        //     "recover":recover
        // }



        // return dataR
         

        // return await studentClass.create({
        //     // 邮箱
        //     className: data.className,
        //     // 验证码
        // });
       

        
        //   return await Person.create({
        //     // 邮箱
        //     name: data.name,
        //     // 验证码
        //     age: data.age,
        //     class_id:data.ClassId
        // });
      
        // 事务

        


    }
    static async updataPerson(data) {
        // return await Person.deleteOne({_id:data.id});
          // return await Person.create({
        //     // 邮箱
        //     name: data.name,
        //     // 验证码
        //     age: data.age
        // });
        return await Person.find({name:data.name}).skip((data.page - 1)*parseInt(2)).limit(2)
    }



}

module.exports = PersionModel;