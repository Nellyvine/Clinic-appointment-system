const patientModel = require('../models/patientModel');

const getPatients = async (req, res) => {
  try {
    const patients = await patientModel.getAllPatients();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving patients', error: err.message });
  }
};

const getPatient = async (req, res) => {
  try {
    const patient = await patientModel.getPatientById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving patient', error: err.message });
  }
};

const addPatient = async (req, res) => {
  try {
    const { name, date_of_birth, phone, email } = req.body;
    if (!name || !date_of_birth) {
      return res.status(400).json({ message: 'Name and date of birth are required' });
    }
    const newPatient = await patientModel.createPatient({ name, date_of_birth, phone, email });
    res.status(201).json({ message: 'Patient successfully added', patient: newPatient });
  } catch (err) {
    res.status(500).json({ message: 'Error creating patient', error: err.message });
  }
};

const editPatient = async (req, res) => {
  try {
    const { name, date_of_birth, phone, email } = req.body;
    if (!name || !date_of_birth) {
      return res.status(400).json({ message: 'Name and date of birth are required' });
    }
    const affectedRows = await patientModel.updatePatient(req.params.id, { name, date_of_birth, phone, email });
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient successfully updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating patient', error: err.message });
  }
};

const removePatient = async (req, res) => {
  try {
    const affectedRows = await patientModel.deletePatient(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient successfully deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting patient', error: err.message });
  }
};

module.exports = { getPatients, getPatient, addPatient, editPatient, removePatient };
