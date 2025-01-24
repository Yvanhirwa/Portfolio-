// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like your HTML, CSS, JS) from the public directory
app.use(express.static('public'));

// Handle form submissions
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    const stmt = db.prepare('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)');
    stmt.run(name, email, message, (err) => {
        if (err) {
            console.error('Error inserting data:', err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.send('Message received!');
        }
    });
    stmt.finalize();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
