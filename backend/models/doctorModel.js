const db = require('../config/database');

const getAllDoctors = async () => {
  const [rows] = await db.query('SELECT * FROM doctors ORDER BY doctor_id');
  return rows;
};

const getDoctorById = async (id) => {
  const [rows] = await db.query('SELECT * FROM doctors WHERE doctor_id = ?', [id]);
  return rows[0];
};

const createDoctor = async (doctor) => {
  const { name, specialisation, phone, email } = doctor;
  const [result] = await db.query(
    'INSERT INTO doctors (name, specialisation, phone, email) VALUES (?, ?, ?, ?)',
    [name, specialisation, phone, email]
  );
  return { doctor_id: result.insertId, ...doctor };
};

const updateDoctor = async (id, doctor) => {
  const { name, specialisation, phone, email } = doctor;
  const [result] = await db.query(
    'UPDATE doctors SET name = ?, specialisation = ?, phone = ?, email = ? WHERE doctor_id = ?',
    [name, specialisation, phone, email, id]
  );
  return result.affectedRows;
};

const deleteDoctor = async (id) => {
  const [result] = await db.query('DELETE FROM doctors WHERE doctor_id = ?', [id]);
  return result.affectedRows;
};

const countDoctors = async () => {
  const [rows] = await db.query('SELECT COUNT(*) AS total FROM doctors');
  return rows[0].total;
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  countDoctors
};
