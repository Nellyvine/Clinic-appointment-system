# Clinic Appointment Management System

A full-stack web application for managing patients, doctors, and appointments at a small medical clinic — built with React.js, Node.js/Express, and MySQL, documented with Swagger.

## Architecture
```
React.js (frontend) → HTTP/JSON → Node.js + Express (backend) → SQL → MySQL
```
The React app never talks to MySQL directly — all data flows through the Node.js API.

## Group D — Team

| Area | Owner |
|---|---|
| Database, Node.js/Express API, Swagger docs | Tako Nellyvine Mizero |
| React frontend, routing, UI | Halimatu Sadia Sadia Mohammed |

## Tech Stack

- **React.js** + **React Router** — frontend
- **Node.js** + **Express.js** — backend REST API
- **MySQL** — database
- **Swagger** (`swagger-jsdoc` + `swagger-ui-express`) — API documentation
- **cors**, **mysql2** — supporting libraries

## Database Design

3 related tables:

- **patients** (`patient_id`, `name`, `date_of_birth`, `phone`, `email`)
- **doctors** (`doctor_id`, `name`, `specialisation`, `phone`, `email`)
- **appointments** (`appointment_id`, `patient_id` → FK, `doctor_id` → FK, `appointment_date`, `appointment_time`, `status`)

`appointments.patient_id` and `appointments.doctor_id` are foreign keys referencing `patients` and `doctors`, with `ON DELETE CASCADE` — deleting a patient or doctor also removes their related appointments.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org)
- [XAMPP](https://www.apachefriends.org) (or any MySQL server)

### 1. Set up the database
Start MySQL (e.g. via XAMPP Control Panel), then in phpMyAdmin's SQL tab, run the contents of `database.sql` from the project root. This creates `clinic_db`, all 3 tables, and 5+ sample rows in each.

### 2. Run the backend
```
cd frontend
npm install
npm run dev
```
- App: `http://localhost:5173`

## API Endpoints (16 total)

| Resource | GET all | GET one | POST | PUT | DELETE |
|---|---|---|---|---|---|
| `/api/patients` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/api/doctors` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/api/appointments` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/api/stats` | ✅ (dashboard totals) | | | | |

Full documentation, request/response schemas, and a "Try it out" tester for every endpoint: `http://localhost:3000/api-docs`

## Example: Create an appointment
**Request**
```
POST /api/appointments
Content-Type: application/json

{
"patient_id": 1,
"doctor_id": 2,
"appointment_date": "2026-10-01",
"appointment_time": "13:00:00",
"status": "scheduled"
}
```
**Response** — `201 Created`
```json
{ "id": 6 }
```

## Error Handling

| Code | Meaning |
|---|---|
| 200 | Successful GET/PUT/DELETE |
| 201 | Resource created |
| 400 | Invalid/missing input, or invalid `patient_id`/`doctor_id` |
| 404 | Resource not found |
| 500 | Server/database error |

## Project Structure
```
clinic-appointment-system/
├── database.sql # Schema + sample data
├── backend/
│ ├── config/database.js # MySQL connection
│ ├── models/ # Database queries
│ ├── controllers/ # Request/response logic
│ ├── routes/ # Endpoint definitions + Swagger docs
│ ├── swagger/swagger.js # Swagger configuration
│ └── app.js # Entry point
└── frontend/
└── src/
├── pages/ # Dashboard, Patients, Doctors, Appointments
├── components/ # Navbar, shared UI
└── services/api.js # API calls (axios)
```
## Testing

All backend endpoints were tested via both **Postman** and the **Swagger UI** (`/api-docs`), including success and error cases (missing fields, non-existent IDs, invalid foreign keys).
