import { Router } from 'express';
import { getAllUsers, fetchDataAndSave, exportToCSV } from '../controllers/dataControllers';

const router = Router();

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
router.post('/external-data', fetchDataAndSave);

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
router.get('/get-users', getAllUsers);

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
router.get('/export-csv', exportToCSV);

export default router;
