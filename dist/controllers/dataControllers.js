"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportToCSV = exports.fetchDataAndSave = exports.getAllUsers = void 0;
const userModel_1 = require("../models/userModel");
const externalAPI_1 = require("../services/externalAPI");
const json2csv_1 = require("json2csv");
const addressModel_1 = require("../models/addressModel");
const geoModel_1 = require("../models/geoModel");
const companyModel_1 = require("../models/companyModel");
//Handler to get all users with pagination
const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;
        const { count, rows } = await userModel_1.User.findAndCountAll({
            include: [
                { model: addressModel_1.Address, include: [geoModel_1.Geo] },
                companyModel_1.Company
            ],
            limit,
            offset,
        });
        res.status(200).json({
            data: rows,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            totalItems: count,
        });
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            message: 'Error fetching users',
            error: error.message || 'Unknown error occurred'
        });
    }
};
exports.getAllUsers = getAllUsers;
// Handler to bring in external data and save it to the database
const fetchDataAndSave = async (req, res) => {
    try {
        const data = await (0, externalAPI_1.fetchExternalData)();
        for (const userData of data) {
            const { address, company, ...userInfo } = userData;
            const user = await userModel_1.User.create(userInfo);
            if (address) {
                const { geo, ...addressData } = address;
                const addressInstance = await addressModel_1.Address.create({
                    ...addressData,
                    userId: user.id,
                });
                if (geo) {
                    await geoModel_1.Geo.create({ ...geo, addressId: addressInstance.id });
                }
            }
            if (company) {
                await companyModel_1.Company.create({ ...company, userId: user.id });
            }
        }
        res.status(200).json({ message: 'Data fetched and saved for all users' });
    }
    catch (error) {
        console.error('Error fetching and saving data:', error);
        res.status(500).json({
            message: 'Error fetching and saving data',
            error: error.message || 'Unknown error occurred'
        });
    }
};
exports.fetchDataAndSave = fetchDataAndSave;
// Handler to export data to CSV
const exportToCSV = async (req, res) => {
    try {
        const users = await userModel_1.User.findAll({
            include: [
                { model: addressModel_1.Address, include: [geoModel_1.Geo] },
                companyModel_1.Company
            ],
        });
        // Cambiamos `map` por `for...of` para usar `await` sin problemas
        const data = [];
        for (const user of users) {
            const address = await addressModel_1.Address.findOne({
                where: {
                    userId: user.id,
                },
            });
            const company = await companyModel_1.Company.findOne({
                where: {
                    userId: user.id,
                },
            });
            data.push({
                ID: user.id,
                Name: user.name,
                Username: user.username,
                Email: user.email,
                Phone: user.phone,
                Website: user.website,
                Address: `${address?.street}, ${address?.suite}, ${address?.city}, ${address?.zipcode}`,
                Company: company?.name,
            });
        }
        const csv = (0, json2csv_1.parse)(data);
        res.header('Content-Type', 'text/csv');
        res.attachment('users.csv');
        res.status(200).send(csv);
    }
    catch (error) {
        console.error('Error exporting data to CSV:', error);
        res.status(500).json({
            message: 'Error exporting data to CSV',
            error: error.message || 'Unknown error occurred'
        });
    }
};
exports.exportToCSV = exportToCSV;
