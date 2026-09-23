const Appointment = require("../models/appointmentModel");

const appointmentController = {
    getAllAppointments: (req, res) => {
        Appointment.getAllAppointments((error, results) => {
            if (error) return res.status(500).json({ error: "Database error" });
           res.status(200).json(results);
        });
    },

    getAppointmentById: (req, res) => {
        Appointment.getAppointmentById(req.params.id, (error, results) => {
            if (error) return res.status(500).json({ error: "Database error" });
            if (results.length === 0) {
                return res.status(404).json({ error: "There is no appointment at that id" });
            }
            res.status(200).json(results[0]);
        });
    },

    createAppointment: (req, res) => {
        const { patient_id, doctor_id, appointment_date, appointment_time, status } = req.body;
        if (!patient_id || !doctor_id || !appointment_date || !appointment_time) {
            return res.status(400).json({
                error: "patient_id, doctor_id, appointment_date, and appointment_time are required"
            });
        }

        Appointment.createAppointment(
            { patient_id, doctor_id, appointment_date, appointment_time, status },
            (error, result) => {
                if (error) {
                    if (error.code === "ER_NO_REFERENCED_ROW_2") {
                        return res.status(400).json({ error: "Invalid patient_id or doctor_id" });
                    }
                    return res.status(500).json({ error: "Database error" });
                }
                res.status(201).json({ id: result.insertId });
            }
        );
    },

    updateAppointment: (req, res) => {
        const id = req.params.id;

        Appointment.getAppointmentById(id, (error, results) => {
            if (error) return res.status(500).json({ error: "Database error" });
            if (results.length === 0) {
                return res.status(404).json({ error: "There is no appointment at that id" });
            }

            const current = results[0];
            const updated = {
                patient_id: req.body.patient_id !== undefined ? req.body.patient_id : current.patient_id,
                doctor_id: req.body.doctor_id !== undefined ? req.body.doctor_id : current.doctor_id,
                appointment_date: req.body.appointment_date !== undefined ? req.body.appointment_date : current.appointment_date,
                appointment_time: req.body.appointment_time !== undefined ? req.body.appointment_time : current.appointment_time,
                status: req.body.status !== undefined ? req.body.status : current.status
            };

            Appointment.updateAppointment(id, updated, (error) => {
                if (error) return res.status(500).json({ error: "Database error" });
                res.status(200).json({ message: "Appointment successfully updated" });
            });
        });
    },

    deleteAppointment: (req, res) => {
        Appointment.deleteAppointment(req.params.id, (error, result) => {
            if (error) return res.status(500).json({ error: "Database error" });
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "There is no appointment at that id" });
            }
            res.status(200).json({ message: "Appointment successfully deleted" });
        });
    }
};

module.exports = appointmentController;