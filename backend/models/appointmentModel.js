const db = require('../config/database');

// Join with patients and doctors so the frontend gets readable names,
// not just foreign key ids
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

const getAllAppointments = async () => {
  const [rows] = await db.query(`${BASE_SELECT} ORDER BY a.appointment_date, a.appointment_time`);
  return rows;
};

const getAppointmentById = async (id) => {
  const [rows] = await db.query(`${BASE_SELECT} WHERE a.appointment_id = ?`, [id]);
  return rows[0];
};

const createAppointment = async (appointment) => {
  const { patient_id, doctor_id, appointment_date, appointment_time, status } = appointment;
  const [result] = await db.query(
    'INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?)',
    [patient_id, doctor_id, appointment_date, appointment_time, status || 'scheduled']
  );
  return { appointment_id: result.insertId, ...appointment };
};

const updateAppointment = async (id, appointment) => {
  const { patient_id, doctor_id, appointment_date, appointment_time, status } = appointment;
  const [result] = await db.query(
    `UPDATE appointments
     SET patient_id = ?, doctor_id = ?, appointment_date = ?, appointment_time = ?, status = ?
     WHERE appointment_id = ?`,
    [patient_id, doctor_id, appointment_date, appointment_time, status, id]
  );
  return result.affectedRows;
};

const deleteAppointment = async (id) => {
  const [result] = await db.query('DELETE FROM appointments WHERE appointment_id = ?', [id]);
  return result.affectedRows;
};

const countAppointments = async () => {
  const [rows] = await db.query('SELECT COUNT(*) AS total FROM appointments');
  return rows[0].total;
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  countAppointments
};
