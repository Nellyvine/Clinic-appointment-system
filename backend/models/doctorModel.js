const db = require("../config/database");

const Doctor = {
    getAllDoctors: (callback) => {
        db.query("SELECT * FROM doctors", callback);
    },

    getDoctorById: (id, callback) => {
        db.query("SELECT * FROM doctors WHERE doctor_id = ?", [id], callback);
    },

    createDoctor: (doctor, callback) => {
        const { name, specialisation, phone, email } = doctor;
        db.query(
            "INSERT INTO doctors (name, specialisation, phone, email) VALUES (?, ?, ?, ?)",
            [name, specialisation, phone, email],
            callback
        );
    },

    updateDoctor: (id, doctor, callback) => {
        const { name, specialisation, phone, email } = doctor;
        db.query(
            "UPDATE doctors SET name = ?, specialisation = ?, phone = ?, email = ? WHERE doctor_id = ?",
            [name, specialisation, phone, email, id],
            callback
        );
    },

    deleteDoctor: (id, callback) => {
        db.query("DELETE FROM doctors WHERE doctor_id = ?", [id], callback);
    }
};

module.exports = Doctor;