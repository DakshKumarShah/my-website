const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'IndiaProject')));

// Serve index.html by default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'IndiaProject', 'index.html'));
});

// Endpoint to get population data from CSV
app.get('/data', (req, res) => {
    const results = [];
    fs.createReadStream(path.join(__dirname, 'IndiaProject', 'js', 'population.csv'))
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});