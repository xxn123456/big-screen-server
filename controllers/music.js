
const MusicModel = require('../modules/music.js')

class MusicController {
    static async create(ctx) {
        let req = ctx.request.body;
        try {
             
            const music = await MusicModel.create(req);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
               des: '保存音乐成功',
                data: music
            }
        } catch (err) {
            ctx.response.status = 200;
            ctx.body = {
                code: 401,
               des: '保存音乐失败',
                data: err
            }

        }


    }
    static async update(ctx) {
        let req = ctx.request.body;
        if (req.id) {
            try {
               
                const music = await MusicModel.update(req);

            

                if (music) {
                    ctx.response.status = 200;
                    ctx.body = {
                        code: 200,
                        des:"更新音乐成功",
                       data: music,
                    }
                }
            } catch (err) {
                ctx.response.status = 200;
                ctx.body = {
                    code: 401,
                   des: '更新异常',
                    data: err
                }

            }

        } else {
            ctx.response.status = 200;
            ctx.body = {
                code: 401,
                des: '查缺少参数id',
                data: music
            }
        }


    }

    static async del(ctx) {
        let req = ctx.request.body;
        if (req.id) {
            try {
               
                const music = await MusicModel.del(req);

            

                if (music) {
                    ctx.response.status = 200;
                    ctx.body = {
                        code: 200,
                        des:"删除音乐成功",
                       data: music
                    }
                }
            } catch (err) {
                ctx.response.status = 200;
                ctx.body = {
                    code: 401,
                    des: '删除音乐失败',
                    data: err
                }

            }

        } else {
            ctx.response.status = 200;
            ctx.body = {
                code: 401,
                des: '查缺少参数id',
                data: music
            }
        }
    }

    static async findAll(ctx) {
        let req = ctx.request.body;
        try {     
            let music = await MusicModel.findAll(req);
            let total= await  MusicModel.queryTotal(req);
            if (music) {
                ctx.response.status = 200;
                ctx.body = {
                code: 200,
                   data: music,
                   total
                }
            }
        } catch (err) {
            ctx.response.status = 200;
            ctx.body = {
                code: 401,
                des: '查找音乐列表失败',
                data: err
            }

        }


    }
}
module.exports = MusicController