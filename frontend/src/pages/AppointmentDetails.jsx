import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAppointment } from '../services/api.js';

function AppointmentDetails() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getAppointment(id)
      .then((res) => setAppointment(res.data))
      .catch(() => setError('Appointment not found.'));
  }, [id]);

  if (error) {
    return (
      <div>
        <p className="error-text">{error}</p>
        <Link to="/appointments">Back to Appointments</Link>
      </div>
    );
  }

  if (!appointment) return <p>Loading...</p>;

  return (
    <div>
      <h1>Appointment Details</h1>
      <div className="card">
        <p><strong>Patient:</strong> {appointment.patient_name}</p>
        <p><strong>Doctor:</strong> {appointment.doctor_name}</p>
        <p><strong>Specialisation:</strong> {appointment.specialisation}</p>
        <p><strong>Date:</strong> {appointment.appointment_date?.slice(0, 10)}</p>
        <p><strong>Time:</strong> {appointment.appointment_time?.slice(0, 5)}</p>
        <p><strong>Status:</strong> {appointment.status}</p>
      </div>
      <Link to="/appointments">Back to Appointments</Link>
    </div>
  );
}

export default AppointmentDetails;
