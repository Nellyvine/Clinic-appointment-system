const db = require('../config/database');

const getAllPatients = async () => {
  const [rows] = await db.query('SELECT * FROM patients ORDER BY patient_id');
  return rows;
};

const getPatientById = async (id) => {
  const [rows] = await db.query('SELECT * FROM patients WHERE patient_id = ?', [id]);
  return rows[0];
};

const createPatient = async (patient) => {
  const { name, date_of_birth, phone, email } = patient;
  const [result] = await db.query(
    'INSERT INTO patients (name, date_of_birth, phone, email) VALUES (?, ?, ?, ?)',
    [name, date_of_birth, phone, email]
  );
  return { patient_id: result.insertId, ...patient };
};

const updatePatient = async (id, patient) => {
  const { name, date_of_birth, phone, email } = patient;
  const [result] = await db.query(
    'UPDATE patients SET name = ?, date_of_birth = ?, phone = ?, email = ? WHERE patient_id = ?',
    [name, date_of_birth, phone, email, id]
  );
  return result.affectedRows;
};

const deletePatient = async (id) => {
  const [result] = await db.query('DELETE FROM patients WHERE patient_id = ?', [id]);
  return result.affectedRows;
};

const countPatients = async () => {
  const [rows] = await db.query('SELECT COUNT(*) AS total FROM patients');
  return rows[0].total;
};

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
  countPatients
};
