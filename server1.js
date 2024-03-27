const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static('public'));

// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for handling form submissions
app.post('/submit', (req, res) => {
    const { email, year, fruit, color } = req.body;

    // Load existing data or initialize an empty array
    let formData = [];
    try {
        formData = JSON.parse(fs.readFileSync('data.json'));
    } catch (err) {
        console.error('Error reading data.json:', err);
    }

    // Check if the email already exists in the data
    const existingEntry = formData.find(entry => entry.email === email);
    if (existingEntry) {
        return res.status(400).send('Form already submitted by this email.');
    }

    // Save the form data
    formData.push({ email, year, fruit, color });
    fs.writeFileSync('data.json', JSON.stringify(formData, null, 2));

    res.send('Form received.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
