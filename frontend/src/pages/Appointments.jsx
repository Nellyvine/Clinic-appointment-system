import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getPatients,
  getDoctors
} from '../services/api.js';

const EMPTY_FORM = {
  patient_id: '',
  doctor_id: '',
  appointment_date: '',
  appointment_time: '',
  status: 'scheduled'
};

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadAppointments = () => {
    getAppointments()
      .then((res) => setAppointments(res.data))
      .catch(() => setError('Unable to load appointments.'));
  };

  useEffect(() => {
    loadAppointments();
    getPatients().then((res) => setPatients(res.data)).catch(() => {});
    getDoctors().then((res) => setDoctors(res.data)).catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.patient_id) return 'Please select a patient.';
    if (!form.doctor_id) return 'Please select a doctor.';
    if (!form.appointment_date) return 'Appointment date cannot be empty.';
    if (!form.appointment_time) return 'Appointment time cannot be empty.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setMessage('');
      return;
    }
    try {
      if (editingId) {
        await updateAppointment(editingId, form);
        setMessage('Appointment successfully updated.');
      } else {
        await createAppointment(form);
        setMessage('Appointment successfully scheduled.');
      }
      setForm(EMPTY_FORM);
      setEditingId(null);
      setShowForm(false);
      setError('');
      loadAppointments();
    } catch (err) {
      setError('Unable to save appointment.');
      setMessage('');
    }
  };

  const handleEdit = (appt) => {
    setForm({
      patient_id: appt.patient_id,
      doctor_id: appt.doctor_id,
      appointment_date: appt.appointment_date?.slice(0, 10) || '',
      appointment_time: appt.appointment_time?.slice(0, 5) || '',
      status: appt.status
    });
    setEditingId(appt.appointment_id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this appointment?')) return;
    try {
      await deleteAppointment(id);
      setMessage('Appointment successfully deleted.');
      loadAppointments();
    } catch (err) {
      setError('Unable to delete appointment.');
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Appointments</h1>
        <button
          className="btn-primary"
          onClick={() => {
            setShowForm(!showForm);
            setForm(EMPTY_FORM);
            setEditingId(null);
          }}
        >
          {showForm ? 'Cancel' : 'Add Appointment'}
        </button>
      </div>

      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}

      {showForm && (
        <div className="card">
          <form onSubmit={handleSubmit}>
            <select name="patient_id" value={form.patient_id} onChange={handleChange}>
              <option value="">Select Patient</option>
              {patients.map((p) => (
                <option key={p.patient_id} value={p.patient_id}>{p.name}</option>
              ))}
            </select>
            <select name="doctor_id" value={form.doctor_id} onChange={handleChange}>
              <option value="">Select Doctor</option>
              {doctors.map((d) => (
                <option key={d.doctor_id} value={d.doctor_id}>{d.name} ({d.specialisation})</option>
              ))}
            </select>
            <input
              name="appointment_date"
              type="date"
              value={form.appointment_date}
              onChange={handleChange}
            />
            <input
              name="appointment_time"
              type="time"
              value={form.appointment_time}
              onChange={handleChange}
            />
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className="btn-primary" type="submit">
              {editingId ? 'Update Appointment' : 'Schedule Appointment'}
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.appointment_id}>
                <td>{a.patient_name}</td>
                <td>{a.doctor_name}</td>
                <td>{a.appointment_date?.slice(0, 10)}</td>
                <td>{a.appointment_time?.slice(0, 5)}</td>
                <td>{a.status}</td>
                <td>
                  <Link to={`/appointments/${a.appointment_id}`}>View</Link>{' '}
                  <button className="btn-edit" onClick={() => handleEdit(a)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(a.appointment_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appointments;
