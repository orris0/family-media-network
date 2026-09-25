// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Set strict security headers including a robust Content Security Policy
app.use((req, res, next) => {
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline';");
    next();
});

// Serve static assets out of a public folder
app.use(express.static(path.join(__dirname, 'public')));

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Family Media Network running securely on http://localhost:${PORT}`);
});
