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
