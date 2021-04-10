
const moment = require("moment");

module.exports = function(sequelize, DataTypes) {
    const user = sequelize.define(
        'user', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: true,
                autoIncrement: true
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'userName'
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'password'
            },
            avatar:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'avatar'
            },
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
            
            freezeTableName: true
        }
    )


    return user
}
