const appointmentModel = require('../models/appointmentModel');

const getAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.getAllAppointments();
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving appointments', error: err.message });
  }
};

const getAppointment = async (req, res) => {
  try {
    const appointment = await appointmentModel.getAppointmentById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving appointment', error: err.message });
  }
};

const addAppointment = async (req, res) => {
  try {
    const { patient_id, doctor_id, appointment_date, appointment_time, status } = req.body;
    if (!patient_id || !doctor_id || !appointment_date || !appointment_time) {
      return res.status(400).json({
        message: 'patient_id, doctor_id, appointment_date and appointment_time are required'
      });
    }
    const newAppointment = await appointmentModel.createAppointment({
      patient_id, doctor_id, appointment_date, appointment_time, status
    });
    res.status(201).json({ message: 'Appointment successfully scheduled', appointment: newAppointment });
  } catch (err) {
    res.status(500).json({ message: 'Error creating appointment', error: err.message });
  }
};

const editAppointment = async (req, res) => {
  try {
    const { patient_id, doctor_id, appointment_date, appointment_time, status } = req.body;
    if (!patient_id || !doctor_id || !appointment_date || !appointment_time) {
      return res.status(400).json({
        message: 'patient_id, doctor_id, appointment_date and appointment_time are required'
      });
    }
    const affectedRows = await appointmentModel.updateAppointment(req.params.id, {
      patient_id, doctor_id, appointment_date, appointment_time, status
    });
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment successfully updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating appointment', error: err.message });
  }
};

const removeAppointment = async (req, res) => {
  try {
    const affectedRows = await appointmentModel.deleteAppointment(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment successfully deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting appointment', error: err.message });
  }
};

module.exports = { getAppointments, getAppointment, addAppointment, editAppointment, removeAppointment };
