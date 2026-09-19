import { NavLink } from 'react-router-dom';

// Change the clinic name here
const CLINIC_NAME = 'Meridian Clinic';

function Navbar() {
  const linkClass = ({ isActive }) => (isActive ? 'active' : '');

  return (
    <nav className="navbar">
      <span className="brand">{CLINIC_NAME}</span>
      <NavLink to="/" end className={linkClass}>Dashboard</NavLink>
      <NavLink to="/patients" className={linkClass}>Patients</NavLink>
      <NavLink to="/doctors" className={linkClass}>Doctors</NavLink>
      <NavLink to="/appointments" className={linkClass}>Appointments</NavLink>
    </nav>
  );
}

export default Navbar;
