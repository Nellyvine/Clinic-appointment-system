CREATE DATABASE IF NOT EXISTS clinic_db;
USE clinic_db;

CREATE TABLE patients (
    patient_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE doctors (
    doctor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialisation VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'scheduled',
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE
);

INSERT INTO patients (name, date_of_birth, phone, email) VALUES
('Aarav Sharma', '1990-04-12', '57651234', 'aarav.sharma@email.com'),
('Meera Pillay', '1985-11-02', '57652345', 'meera.pillay@email.com'),
('Jean Dupont', '1978-06-23', '57653456', 'jean.dupont@email.com'),
('Lila Ramsamy', '2001-01-15', '57654567', 'lila.ramsamy@email.com'),
('Kevin Li', '1995-09-30', '57655678', 'kevin.li@email.com');

INSERT INTO doctors (name, specialisation, phone, email) VALUES
('Dr. Nadia Khan', 'General Practice', '57661234', 'nadia.khan@clinic.com'),
('Dr. Marc Leblanc', 'Cardiology', '57662345', 'marc.leblanc@clinic.com'),
('Dr. Priya Naidoo', 'Dermatology', '57663456', 'priya.naidoo@clinic.com'),
('Dr. Thomas Bruno', 'Pediatrics', '57664567', 'thomas.bruno@clinic.com'),
('Dr. Amina Yusuf', 'Orthopedics', '57665678', 'amina.yusuf@clinic.com');

INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status) VALUES
(1, 1, '2026-09-25', '09:00:00', 'scheduled'),
(2, 2, '2026-09-25', '10:30:00', 'scheduled'),
(3, 3, '2026-09-26', '11:00:00', 'completed'),
(4, 4, '2026-09-27', '14:00:00', 'scheduled'),
(5, 5, '2026-09-27', '15:30:00', 'cancelled');