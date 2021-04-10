const moment = require("moment");
module.exports = function(sequelize, DataTypes) {
    const ey_user = sequelize.define('ey_user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        //文章标题
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'userName'
        },
    }, {
        /**
         * 如果为true，则表示名称和model相同，即user
         * 如果为fasle，mysql创建的表名称会是复数，即users
         * 如果指定的表名称本身就是复数，则形式不变
         */
         timestamps: false,
       
        freezeTableName: true
    });
    return ey_user
}