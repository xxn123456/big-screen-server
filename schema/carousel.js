const moment = require("moment");
module.exports = function(sequelize, DataTypes) {
    const carousel = sequelize.define(
        'carousel', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: true,
                autoIncrement: true
            },
            pic: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'pic'
            },
            url: {
                type: DataTypes.STRING,
                field: 'url'
            },
            title: {
                type: DataTypes.STRING,
                field: 'title',
                defaultValue: ''
            },
            userId:{
                type: DataTypes.STRING,
                field: 'userId',
                defaultValue: '1'
            },
            active:{
                type:DataTypes.INTEGER,
                field: 'active',
                allowNull: false,
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
            freezeTableName: true,
            timestamps: true
        }
    )


    return carousel
}