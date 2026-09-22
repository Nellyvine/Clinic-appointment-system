import { useEffect, useState } from 'react';
import {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient
} from '../services/api.js';

const EMPTY_FORM = { name: '', date_of_birth: '', phone: '', email: '' };

function Patients() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadPatients = () => {
    getPatients()
      .then((res) => setPatients(res.data))
      .catch(() => setError('Unable to load patients.'));
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name.trim()) return 'Name cannot be empty.';
    if (!form.date_of_birth) return 'Date of birth cannot be empty.';
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
        await updatePatient(editingId, form);
        setMessage('Patient successfully updated.');
      } else {
        await createPatient(form);
        setMessage('Patient successfully added.');
      }
      setForm(EMPTY_FORM);
      setEditingId(null);
      setShowForm(false);
      setError('');
      loadPatients();
    } catch (err) {
      setError('Unable to save patient.');
      setMessage('');
    }
  };

  const handleEdit = (patient) => {
    setForm({
      name: patient.name,
      date_of_birth: patient.date_of_birth?.slice(0, 10) || '',
      phone: patient.phone || '',
      email: patient.email || ''
    });
    setEditingId(patient.patient_id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this patient?')) return;
    try {
      await deletePatient(id);
      setMessage('Patient successfully deleted.');
      loadPatients();
    } catch (err) {
      setError('Unable to delete patient.');
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Patients</h1>
        <button
          className="btn-primary"
          onClick={() => {
            setShowForm(!showForm);
            setForm(EMPTY_FORM);
            setEditingId(null);
          }}
        >
          {showForm ? 'Cancel' : 'Add Patient'}
        </button>
      </div>

      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}

      {showForm && (
        <div className="card">
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              name="date_of_birth"
              type="date"
              value={form.date_of_birth}
              onChange={handleChange}
            />
            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
            />
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <button className="btn-primary" type="submit">
              {editingId ? 'Update Patient' : 'Add Patient'}
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.patient_id}>
                <td>{p.name}</td>
                <td>{p.date_of_birth?.slice(0, 10)}</td>
                <td>{p.phone}</td>
                <td>{p.email}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(p.patient_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Patients;
