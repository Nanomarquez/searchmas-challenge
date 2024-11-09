"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Geo = void 0;
const sequelize_1 = require("sequelize");
const addressModel_1 = require("./addressModel");
class Geo extends sequelize_1.Model {
    static initModel(sequelize) {
        Geo.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            lat: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            lng: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            addressId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'Geo',
        });
    }
    static associate() {
        Geo.belongsTo(addressModel_1.Address, { foreignKey: 'addressId' });
    }
}
exports.Geo = Geo;
