const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const dataFilePath = path.join(__dirname, 'data.json');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    const { email, year, fruit, color } = req.body;

console.log('Form data received:', { email, year, fruit, color });

    let formData = [];
    try {
        // Read existing data
        formData = JSON.parse(fs.readFileSync(dataFilePath));
    } catch (err) {
        console.error('Error reading data.json:', err);
    }

    const existingEntry = formData.find(entry => entry.email === email);
    if (existingEntry) {
        return res.status(400).send('Form already submitted by this email.');
    }

    // Save the form data
    formData.push({ email, year, fruit, color });
try {
    // Write to file
    fs.writeFileSync(dataFilePath, JSON.stringify(formData, null, 2));
    console.log('Form data saved to data.json');
    res.send('Form received.');
} catch (err) {
    console.error('Error writing to data.json:', err);
    res.status(500).send('Error saving form data.');
}
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
