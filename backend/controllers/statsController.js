const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");

// Wraps a callback-style function in a Promise so we can use
// Promise.all to run all three counts at the same time.
const countAsPromise = (fn) => {
    return new Promise((resolve, reject) => {
        fn((error, results) => {
            if (error) return reject(error);
            resolve(results[0].total);
        });
    });
};

const getStats = (req, res) => {
    Promise.all([
        countAsPromise(Patient.countPatients),
        countAsPromise(Doctor.countDoctors),
        countAsPromise(Appointment.countAppointments)
    ])
        .then(([totalPatients, totalDoctors, totalAppointments]) => {
            res.status(200).json({ totalPatients, totalDoctors, totalAppointments });
        })
        .catch((error) => {
            res.status(500).json({ error: "Database error" });
        });
};

module.exports = { getStats };