const express = require('express');
const router = express.Router();
const patientModel = require('../models/patientModel');
const doctorModel = require('../models/doctorModel');
const appointmentModel = require('../models/appointmentModel');

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Get dashboard statistics (totals)
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Total counts for patients, doctors, and appointments
 */
router.get('/', async (req, res) => {
  try {
    const [totalPatients, totalDoctors, totalAppointments] = await Promise.all([
      patientModel.countPatients(),
      doctorModel.countDoctors(),
      appointmentModel.countAppointments()
    ]);
    res.status(200).json({ totalPatients, totalDoctors, totalAppointments });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving stats', error: err.message });
  }
});

module.exports = router;
