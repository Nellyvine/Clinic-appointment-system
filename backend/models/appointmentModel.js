const db = require("../config/database");

const BASE_SELECT = `
    SELECT
        a.appointment_id,
        a.patient_id,
        a.doctor_id,
        a.appointment_date,
        a.appointment_time,
        a.status,
        p.name AS patient_name,
        d.name AS doctor_name,
        d.specialisation
    FROM appointments a
    JOIN patients p ON a.patient_id = p.patient_id
    JOIN doctors d ON a.doctor_id = d.doctor_id
`;

const Appointment = {
    getAllAppointments: (callback) => {
        db.query(`${BASE_SELECT} ORDER BY a.appointment_date, a.appointment_time`, callback);
    },

    getAppointmentById: (id, callback) => {
        db.query(`${BASE_SELECT} WHERE a.appointment_id = ?`, [id], callback);
    },

    createAppointment: (appointment, callback) => {
        const { patient_id, doctor_id, appointment_date, appointment_time, status } = appointment;
        db.query(
            "INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?)",
            [patient_id, doctor_id, appointment_date, appointment_time, status || "scheduled"],
            callback
        );
    },

    updateAppointment: (id, appointment, callback) => {
        const { patient_id, doctor_id, appointment_date, appointment_time, status } = appointment;
        db.query(
            "UPDATE appointments SET patient_id = ?, doctor_id = ?, appointment_date = ?, appointment_time = ?, status = ? WHERE appointment_id = ?",
            [patient_id, doctor_id, appointment_date, appointment_time, status, id],
            callback
        );
    },

    deleteAppointment: (id, callback) => {
        db.query("DELETE FROM appointments WHERE appointment_id = ?", [id], callback);
    },

    countAppointments: (callback) => {
        db.query("SELECT COUNT(*) AS total FROM appointments", callback);
    }
};

module.exports = Appointment;