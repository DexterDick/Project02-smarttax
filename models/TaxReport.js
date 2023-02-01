const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class TaxReport extends Model {}

TaxReport.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        income: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'taxReport',
    }
);

module.exports = TaxReport;
