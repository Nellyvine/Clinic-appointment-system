import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';

function App() { 
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<h1>Dashboard</h1>} />
                <Route path="/patients" element={<h1>Patients</h1>} />
                <Route path="/doctors" element={<h1>Doctors</h1>} />
                <Route path="/appointments" element={<h1>Appointments</h1>} />
            </Routes>
        </div>
    ); 
} 

export default App;