const db = require("../config/database");

const Patient = {
    getAllPatients: (callback) => {
        db.query("SELECT * FROM patients", callback);
    },

    getPatientById: (id, callback) => {
        db.query("SELECT * FROM patients WHERE patient_id = ?", [id], callback);
    },

    createPatient: (patient, callback) => {
        const { name, date_of_birth, phone, email } = patient;
        db.query(
            "INSERT INTO patients (name, date_of_birth, phone, email) VALUES (?, ?, ?, ?)",
            [name, date_of_birth, phone, email],
            callback
        );
    },

    updatePatient: (id, patient, callback) => {
        const { name, date_of_birth, phone, email } = patient;
        db.query(
            "UPDATE patients SET name = ?, date_of_birth = ?, phone = ?, email = ? WHERE patient_id = ?",
            [name, date_of_birth, phone, email, id],
            callback
        );
    },

    deletePatient: (id, callback) => {
        db.query("DELETE FROM patients WHERE patient_id = ?", [id], callback);
    }
};

module.exports = Patient;