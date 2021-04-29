const screenModel = require('../modules/screen.js');

const Schema_layout = null;

exports.screenSocket = (io, socket) => {

    socket.on("submit", (data) => {
        console.log("接受到消息");
    });
    socket.on("sendMsg", async (data) => {
        if (data.screen_id) {
            let screen = await screenModel.getDetail(data.screen_id);
            let layout = screen.layout;
            if (layout) {
                socket.join(socket.id);
                Schema_layout=setInterval(() => {
                    io.to(socket.id).emit('sendAll', layout)
                }, 3000);
            }
        }
    })
    socket.on("sendFile", data => {
        io.emit("sendFileAll", data)
    })
    // 用户断开连接的时候
    socket.on('disconnect', () => {
        clearInterval(Schema_layout);
        console.log("异常断开");
     
    })
}