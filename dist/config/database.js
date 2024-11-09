"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv = __importStar(require("dotenv"));
const geoModel_1 = require("../models/geoModel");
const userModel_1 = require("../models/userModel");
const addressModel_1 = require("../models/addressModel");
const companyModel_1 = require("../models/companyModel");
dotenv.config();
const sequelize = new sequelize_1.Sequelize({
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    dialect: 'postgres',
    logging: false
});
// Initialize the models
userModel_1.User.initModel(sequelize);
addressModel_1.Address.initModel(sequelize);
geoModel_1.Geo.initModel(sequelize);
companyModel_1.Company.initModel(sequelize);
// Define associations
userModel_1.User.associate();
addressModel_1.Address.associate();
geoModel_1.Geo.associate();
companyModel_1.Company.associate();
exports.default = sequelize;
