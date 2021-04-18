const moment = require("moment");
module.exports = function(sequelize, DataTypes) {
    const Component = sequelize.define('component', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        //组件名称
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'name'
        },
        // 组件类别
        component_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'component_type_id'
        },
        // 组件图片
        component_pic: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'component_pic'
        },

        option: {
            type: DataTypes.TEXT,
            field: 'option'
        },
        // 组件别名
        other_name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'other_name'
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
    return Component
}