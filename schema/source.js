const moment = require("moment");
module.exports = function(sequelize, DataTypes) {
    const Source = sequelize.define('source', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        //连接名称
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'title'
        },
        source_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'source_type_id'
        },
        // 数据库用户名
        sql_user: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'sql_user'
        },
        // 数据库密码
        sql_pass: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'sql_pass'
        },
        // 链接网址
        host: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'host'
        },
        // 端口
        port: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'port'
        },
        // 时区配置
        time_zone: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'time_zone'
        },
        // 创建时间
        createdAt: {
            type: DataTypes.DATE,
            get () {
                // console.log(this.getDataValue('created_time'))
                return this.getDataValue('createdAt') ? moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss') : null;
              }
        },
        // 更新时间
        updatedAt: {
            type: DataTypes.DATE,
            get () {
                // console.log(this.getDataValue('created_time'))
                return this.getDataValue('updatedAt') ? moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss') : null;
              }
        }
    }, {
        /**
         * 如果为true，则表示名称和model相同，即user
         * 如果为fasle，mysql创建的表名称会是复数，即users
         * 如果指定的表名称本身就是复数，则形式不变
         */
        freezeTableName: true
    });

    return Source

}