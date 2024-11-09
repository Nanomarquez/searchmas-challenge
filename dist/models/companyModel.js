"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const sequelize_1 = require("sequelize");
const userModel_1 = require("./userModel");
class Company extends sequelize_1.Model {
    static initModel(sequelize) {
        Company.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            catchPhrase: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            bs: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'Company',
        });
    }
    static associate() {
        Company.belongsTo(userModel_1.User, { foreignKey: 'userId' });
    }
}
exports.Company = Company;
