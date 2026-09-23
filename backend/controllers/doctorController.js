const Doctor = require("../models/doctorModel");

const doctorController = {
    getAllDoctors: (req, res) => {
        Doctor.getAllDoctors((error, results) => {
            if (error) return res.status(500).json({ error: "Database error" });
            res.status(200).json(results);
        });
    },

    getDoctorById: (req, res) => {
        Doctor.getDoctorById(req.params.id, (error, results) => {
            if (error) return res.status(500).json({ error: "Database error" });
            if (results.length === 0) {
                return res.status(404).json({ error: "There is no doctor at that id" });
            }
            res.status(200).json(results[0]);
        });
    },

    createDoctor: (req, res) => {
        const { name, specialisation, phone, email } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }

        Doctor.createDoctor({ name, specialisation, phone, email }, (error, result) => {
            if (error) return res.status(500).json({ error: "Database error" });
            res.status(201).json({ id: result.insertId });
        });
    },

    updateDoctor: (req, res) => {
        const id = req.params.id;

        Doctor.getDoctorById(id, (error, results) => {
            if (error) return res.status(500).json({ error: "Database error" });
            if (results.length === 0) {
                return res.status(404).json({ error: "There is no doctor at that id" });
            }

            const current = results[0];
            const updated = {
                name: req.body.name !== undefined ? req.body.name : current.name,
                specialisation: req.body.specialisation !== undefined ? req.body.specialisation : current.specialisation,
                phone: req.body.phone !== undefined ? req.body.phone : current.phone,
                email: req.body.email !== undefined ? req.body.email : current.email
            };

            Doctor.updateDoctor(id, updated, (error) => {
                if (error) return res.status(500).json({ error: "Database error" });
                res.status(200).json({ message: "Doctor successfully updated" });
            });
        });
    },

    deleteDoctor: (req, res) => {
        Doctor.deleteDoctor(req.params.id, (error, result) => {
            if (error) return res.status(500).json({ error: "Database error" });
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "There is no doctor at that id" });
            }
            res.status(200).json({ message: "Doctor successfully deleted" });
        });
    }
};

module.exports = doctorController;