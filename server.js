const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const app = express();

// Enable secure HTTP headers to shield survivor browsing profiles
app.use(helmet({
    contentSecurityPolicy: false // Allows the interface to pull system fonts and stylesheets safely
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Map and serve static assets derived from the source repositories
app.use(express.static(path.join(__dirname, 'public')));

// Explicit shelter routing logic
const targetFacilities = [
    'the-kelly',
    'the-andrews',
    'the-travellers-hotel',
    'breaking-ground',
    'brc-25th-street'
];
// Strict validation mapping array matching the frontend list
const ALLOWED_FACILITIES = ['the-kelly', 'the-andrews', 'the-travellers-hotel', 'breaking-ground', 'brc-25th-street'];

app.post('/api/report-incident', (req, res) => {
    try {
        const { shelter, details } = req.body;

        // 1. Fail-fast safety checking for raw undefined objects
        if (!shelter || !details) {
            return res.status(400).json({ error: "Incomplete data format received." });
        }

        // 2. Strict whitelist valuation checks
        if (!ALLOWED_FACILITIES.includes(shelter)) {
            return res.status(400).json({ error: "Malicious tracking parameter detected." });
        }

        // 3. Double-check input lengths on the server side to protect system storage logs
        if (details.length < 20 || details.length > 3000) {
            return res.status(400).json({ error: "Input violates standard data length constraints." });
        }

        // ANONYMOUS EXECUTION LAYER:
        // Do NOT log the req.ip or req.headers. Here you would securely route 
        // the text to an encrypted database or send an encrypted text alert.
        console.log(`[SECURE LOG ENTRY] New incident entry registered for facility: ${shelter}`);

        return res.status(200).json({ status: "success", message: "Data received securely." });

    } catch (err) {
        // Suppress developer stack traces from exposing file systems to clients
        return res.status(500).json({ error: "Internal processing error." });
    }
});

targetFacilities.forEach(facility => {
    app.get(`/registries/${facility}`, (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'registries', `${facility}.html`));
    });
});

// Bookshelf API: Showcases your 4 specific web development books
app.get('/api/bookshelf', (req, res) => {
    res.json([
        { id: 1, title: "Creating a Website: The Missing Manual", category: "Backend Architecture", focus: "Express routing and site infrastructure blueprints." },
        { id: 2, title: "Practical HTML5 Projects", category: "Semantic Structural Grids", focus: "Chronological timelines for logging shelter incident entries." },
        { id: 3, title: "jQuery: Novice to Ninja", category: "Dynamic Logic", focus: "Secure user action event handlers and text template copying." },
        { id: 4, title: "CSS Secrets by Lea Verou", category: "Advanced UI/UX Typography", focus: "High-contrast themes optimized for screen readers and disabled visitors." }
    ]);
});

// Enforce a safe API fallback route to block 'Unexpected token < in JSON' error crashes
app.use('/api', (req, res) => {
    res.status(404).json({ error: "API data stream endpoint not found." });
});

// Standard fallback routing for main section
app.get('/know-your-rights', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'know-your-rights', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`Family Media Network Activation Successful`);
    console.log(`Advocacy portal executing smoothly on http://localhost:${PORT}`);
    console.log(`=======================================================`);
});
