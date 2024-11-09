"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const addressModel_1 = require("./addressModel");
const companyModel_1 = require("./companyModel");
class User extends sequelize_1.Model {
    static initModel(sequelize) {
        User.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            username: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            phone: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            website: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
        }, {
            sequelize,
            modelName: 'User',
        });
    }
    static associate() {
        User.hasOne(addressModel_1.Address, { foreignKey: 'userId' });
        User.hasOne(companyModel_1.Company, { foreignKey: 'userId' });
    }
}
exports.User = User;
