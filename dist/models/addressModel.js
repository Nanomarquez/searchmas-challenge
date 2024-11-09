"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const sequelize_1 = require("sequelize");
const geoModel_1 = require("./geoModel");
const userModel_1 = require("./userModel");
class Address extends sequelize_1.Model {
    static initModel(sequelize) {
        Address.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            street: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            suite: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            city: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            zipcode: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'Address',
        });
    }
    static associate() {
        Address.belongsTo(userModel_1.User, { foreignKey: 'userId' });
        Address.hasOne(geoModel_1.Geo, { foreignKey: 'addressId' });
    }
}
exports.Address = Address;
