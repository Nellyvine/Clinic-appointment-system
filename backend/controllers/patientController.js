const Patient = require("../models/patientModel");

const patientController = {
    getAllPatients: (req, res) => {
        Patient.getAllPatients((error, results) => {
            if (error) return res.status(500).json({ error: "Database error" });
           res.status(200).json(results);
        });
    },

    getPatientById: (req, res) => {
        Patient.getPatientById(req.params.id, (error, results) => {
            if (error) return res.status(500).json({ error: "Database error" });
            if (results.length === 0) {
                return res.status(404).json({ error: "There is no patient at that id" });
            }
            res.status(200).json(results[0]);
        });
    },

    createPatient: (req, res) => {
        const { name, date_of_birth, phone, email } = req.body;
        if (!name || !date_of_birth) {
            return res.status(400).json({ error: "Name and date_of_birth are required" });
        }

        Patient.createPatient({ name, date_of_birth, phone, email }, (error, result) => {
            if (error) return res.status(500).json({ error: "Database error" });
            res.status(201).json({ id: result.insertId });
        });
    },

    updatePatient: (req, res) => {
        const id = req.params.id;

        Patient.getPatientById(id, (error, results) => {
            if (error) return res.status(500).json({ error: "Database error" });
            if (results.length === 0) {
                return res.status(404).json({ error: "There is no patient at that id" });
            }

            const current = results[0];
            const updated = {
                name: req.body.name !== undefined ? req.body.name : current.name,
                date_of_birth: req.body.date_of_birth !== undefined ? req.body.date_of_birth : current.date_of_birth,
                phone: req.body.phone !== undefined ? req.body.phone : current.phone,
                email: req.body.email !== undefined ? req.body.email : current.email
            };

            Patient.updatePatient(id, updated, (error) => {
                if (error) return res.status(500).json({ error: "Database error" });
                res.status(200).json({ message: "Patient successfully updated" });
            });
        });
    },

    deletePatient: (req, res) => {
        Patient.deletePatient(req.params.id, (error, result) => {
            if (error) return res.status(500).json({ error: "Database error" });
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "There is no patient at that id" });
            }
            res.status(200).json({ message: "Patient successfully deleted" });
        });
    }
};

module.exports = patientController;