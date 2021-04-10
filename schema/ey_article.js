const moment = require("moment");
module.exports = function (sequelize, DataTypes) {
    const ey_article = sequelize.define('ey_article', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        uid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'uid'
        },
        //文章标题
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'title'
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
    return ey_article
}