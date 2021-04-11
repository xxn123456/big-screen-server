const moment = require("moment");
module.exports = function (sequelize, DataTypes) {
    const Resource_limit = sequelize.define('resource_limit', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        // 公司名称
        company_name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'company_name'
        },

        // 公司电话
        company_phone: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'company_phone'
        },
        // 权限状态
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'state'
        },

        // 拥有权限

        limit: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'limit'
        },








        // 类别创建人
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'user_id'
        },
        // 创建时间
        createdAt: {
            type: DataTypes.DATE,
            get() {
                // console.log(this.getDataValue('created_time'))
                return this.getDataValue('createdAt') ? moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss') : null;
            }
        },
        // 更新时间
        updatedAt: {
            type: DataTypes.DATE,
            get() {
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
    return Resource_limit
}