const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");

/**
 * @swagger
 * tags:
 *   name: Stats
 *   description: Dashboard summary statistics
 */

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Get total counts of patients, doctors, and appointments
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Summary statistics for the dashboard
 */
router.get("/", statsController.getStats);

module.exports = router;