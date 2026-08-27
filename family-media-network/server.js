const express = require('express');
const path = require('path');
const app = express();

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Sample API Endpoint for shelter metrics / fundraising data
app.get('/api/shelter-data', (req, res) => {
    // ALWAYS verify you are returning a true JSON object, not plain text
    res.json({
        status: "success",
        shelters: ["The Kelly", "The Andrews", "The Travellers Hotel", "Breaking Ground"]
    });
});

// Serve your frontend static elements
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all 404 handler for API routes (PREVENTS the "html instead of json" error)
app.use('/api', (req, res) => {
    res.status(404).json({ error: "API route endpoint not found." });
});

// Standard catch-all for web pages
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Example using modern JavaScript Fetch
fetch('/api/shelter-data')
    .then(response => {
        // Check if the response header is actually JSON before parsing
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("Oops, we didn't get JSON from the server!");
        }
        return response.json();
    })
    .then(data => {
        console.log("Securely loaded platform data:", data);
    })
    .catch(error => {
        console.error("Data tracking failure caught cleanly:", error.message);
    });


app.listen(3000, () => console.log('Server running safely on port 3000'));

