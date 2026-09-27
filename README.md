# Full-Stack Web Development Summative Project
Group D - Clinic Appointment Management System

## Team
- Halimatu Sadia Mohammed: Frontend (React, React Router, styling, API integration)
- Nellyvine Tako Mizero: Backend (Node.js, Express, MySQL, Swagger)

## Demo Video
[Watch the demo](https://drive.google.com/drive/folders/16QDxFqTvW5FimHrh_m0WZIJlsHHxIXsU?usp=sharing)

## Overview
A web application for a small medical clinic to manage patients, doctors, and appointments. Reception staff can register patients, view available doctors, and schedule, edit, or cancel appointments, all backed by a MySQL database rather than paper records.

## Tech Stack
- Frontend: React (Vite), React Router, Axios
- Backend: Node.js, Express.js
- Database: MySQL
- API Documentation: Swagger

## Architecture
```
React (frontend) -> HTTP/JSON -> Node.js + Express (backend) -> SQL -> MySQL
```

## Features
- Dashboard with live statistics (total patients, doctors, appointments) and a list of upcoming appointments
- Patients: view, add, edit, delete
- Doctors: view, add, edit, delete
- Appointments: view, add, edit, delete, each linked to a specific patient and doctor
- Appointment details page with dynamic routing
- Form validation with inline error messages
- Full REST API, documented and testable through Swagger

## Project Structure
```
clinic-appointment-system/
├── database.sql
├── backend/
│   ├── config/database.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── swagger/swagger.js
│   └── app.js
└── frontend/
    └── src/
        ├── components/
        ├── pages/
        └── services/api.js
```

## Setup Instructions

### Prerequisites
- Node.js installed
- MySQL installed and running

### 1. Database
Open `database.sql` in MySQL Workbench and run it, or from a terminal:
```
mysql -u root -p < database.sql
```
This creates the `clinic_db` database with the `patients`, `doctors`, and `appointments` tables, pre-loaded with sample data.

### 2. Backend
```
cd backend
npm install
```
Update `config/database.js` with your local MySQL credentials, then:
```
npm run dev
```
- API: http://localhost:3000
- Swagger documentation: http://localhost:3000/api-docs

### 3. Frontend
```
cd frontend
npm install
npm run dev
```
- Application: http://localhost:5173
Note: the backend and frontend must both be running at the same time, in two separate terminals.

## API Endpoints
| Resource | GET all | GET one | POST | PUT | DELETE |
|---|---|---|---|---|---|
| /api/patients | Yes | Yes | Yes | Yes | Yes |
| /api/doctors | Yes | Yes | Yes | Yes | Yes |
| /api/appointments | Yes | Yes | Yes | Yes | Yes |
| /api/stats | Yes (dashboard totals) | - | - | - | - |

## Database Schema
- patients (patient_id PK, name, date_of_birth, phone, email)
- doctors (doctor_id PK, name, specialisation, phone, email)
- appointments (appointment_id PK, patient_id FK -> patients, doctor_id FK -> doctors, appointment_date, appointment_time, status)
