import { useEffect, useState } from 'react';
import { getStats } from '../services/api.js';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getStats()
      .then((res) => setStats(res.data))
      .catch(() => setError('Unable to load dashboard statistics.'));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p className="error-text">{error}</p>}
      {!stats && !error && <p>Loading...</p>}
      {stats && (
        <div className="stats-grid">
          <div className="stat-box">
            <div className="value">{stats.totalPatients}</div>
            <div>Total Patients</div>
          </div>
          <div className="stat-box">
            <div className="value">{stats.totalDoctors}</div>
            <div>Total Doctors</div>
          </div>
          <div className="stat-box">
            <div className="value">{stats.totalAppointments}</div>
            <div>Total Appointments</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
