const doctorModel = require('../models/doctorModel');

const getDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.getAllDoctors();
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving doctors', error: err.message });
  }
};

const getDoctor = async (req, res) => {
  try {
    const doctor = await doctorModel.getDoctorById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving doctor', error: err.message });
  }
};

const addDoctor = async (req, res) => {
  try {
    const { name, specialisation, phone, email } = req.body;
    if (!name || !specialisation) {
      return res.status(400).json({ message: 'Name and specialisation are required' });
    }
    const newDoctor = await doctorModel.createDoctor({ name, specialisation, phone, email });
    res.status(201).json({ message: 'Doctor successfully added', doctor: newDoctor });
  } catch (err) {
    res.status(500).json({ message: 'Error creating doctor', error: err.message });
  }
};

const editDoctor = async (req, res) => {
  try {
    const { name, specialisation, phone, email } = req.body;
    if (!name || !specialisation) {
      return res.status(400).json({ message: 'Name and specialisation are required' });
    }
    const affectedRows = await doctorModel.updateDoctor(req.params.id, { name, specialisation, phone, email });
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json({ message: 'Doctor successfully updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating doctor', error: err.message });
  }
};

const removeDoctor = async (req, res) => {
  try {
    const affectedRows = await doctorModel.deleteDoctor(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json({ message: 'Doctor successfully deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting doctor', error: err.message });
  }
};

module.exports = { getDoctors, getDoctor, addDoctor, editDoctor, removeDoctor };
