const moment = require("moment");
module.exports = function(sequelize, DataTypes) {
    const Menu = sequelize.define('menu', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        // 菜单名称
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'name'
        },
        // 菜单路径
        path: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'path'
        },

        // vue 路由组件

        router_compent: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'router_compent'
        },

        // 上层id
        p_id: {
            type: DataTypes.INTEGER,
            field: 'p_id',
            default: 0
        },

        
        // 角色路由
        role_router: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'role_router'
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
    return Menu
}