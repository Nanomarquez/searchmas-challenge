"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dataControllers_1 = require("../controllers/dataControllers");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/external-data:
 *   post:
 *     summary: Fetch and save external data
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: Data fetched and saved for all users.
 *       500:
 *         description: Error fetching and saving data.
 */
router.post('/external-data', dataControllers_1.fetchDataAndSave);
/**
 * @swagger
 * /api/get-users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *         default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of users per page
 *         default: 5
 *     responses:
 *       200:
 *         description: A list of users.
 *       500:
 *         description: Error fetching users.
 */
router.get('/get-users', dataControllers_1.getAllUsers);
/**
 * @swagger
 * /api/export-csv:
 *   get:
 *     summary: Export users to CSV
 *     tags: [User]
 *     responses:
 *       200:
 *         description: CSV file containing users data.
 *       500:
 *         description: Error exporting data to CSV.
 */
router.get('/export-csv', dataControllers_1.exportToCSV);
exports.default = router;
