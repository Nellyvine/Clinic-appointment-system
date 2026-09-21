const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "clinic_db"
});

connection.connect((error) => {
    if (error) {
        console.log("Database connection failed:", error);
        return;
    }
    console.log("Connected to MySQL database.");
});

module.exports = connection;