
const moment = require("moment");

module.exports = function(sequelize, DataTypes) {
    const user = sequelize.define(
        'foods', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name'
            },
            createdAt: {
                type: DataTypes.DATE,
                get () {
                    return this.getDataValue('createdAt') ? moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss') : null;
                  }
            },
            // 更新时间
            updatedAt: {
                type: DataTypes.DATE,
                get () {
                    return this.getDataValue('updatedAt') ? moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss') : null;
                  }
            }
        }, {
            
            freezeTableName: true
        }
    )


    return user
}
