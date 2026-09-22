import { useEffect, useState } from 'react';
import {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor
} from '../services/api.js';

const EMPTY_FORM = { name: '', specialisation: '', phone: '', email: '' };

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadDoctors = () => {
    getDoctors()
      .then((res) => setDoctors(res.data))
      .catch(() => setError('Unable to load doctors.'));
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name.trim()) return 'Name cannot be empty.';
    if (!form.specialisation.trim()) return 'Specialisation cannot be empty.';
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
        await updateDoctor(editingId, form);
        setMessage('Doctor successfully updated.');
      } else {
        await createDoctor(form);
        setMessage('Doctor successfully added.');
      }
      setForm(EMPTY_FORM);
      setEditingId(null);
      setShowForm(false);
      setError('');
      loadDoctors();
    } catch (err) {
      setError('Unable to save doctor.');
      setMessage('');
    }
  };

  const handleEdit = (doctor) => {
    setForm({
      name: doctor.name,
      specialisation: doctor.specialisation || '',
      phone: doctor.phone || '',
      email: doctor.email || ''
    });
    setEditingId(doctor.doctor_id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this doctor?')) return;
    try {
      await deleteDoctor(id);
      setMessage('Doctor successfully deleted.');
      loadDoctors();
    } catch (err) {
      setError('Unable to delete doctor.');
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Doctors</h1>
        <button
          className="btn-primary"
          onClick={() => {
            setShowForm(!showForm);
            setForm(EMPTY_FORM);
            setEditingId(null);
          }}
        >
          {showForm ? 'Cancel' : 'Add Doctor'}
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
              name="specialisation"
              placeholder="Specialisation"
              value={form.specialisation}
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
              {editingId ? 'Update Doctor' : 'Add Doctor'}
            </button>
          </form>
        </div>
      )}

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialisation</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((d) => (
              <tr key={d.doctor_id}>
                <td>{d.name}</td>
                <td>{d.specialisation}</td>
                <td>{d.phone}</td>
                <td>{d.email}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(d)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(d.doctor_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Doctors;
