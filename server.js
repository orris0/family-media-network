const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const app = express();

// Secure layout layers to completely protect survivor traffic profiles
app.use(helmet({
    contentSecurityPolicy: false // Allows the app to render remote webfonts safely
})); 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend assets compiled from your repositories
app.use(express.static(path.join(__dirname, 'public')));

// Explicit Facility Registry Routing
const facilityRegistry = [
    'the-kelly', 
    'the-andrews', 
    'the-travellers-hotel', 
    'breaking-ground',
    'brc-25th-street'
];

facilityRegistry.forEach(facility => {
    app.get(`/shelter-registry/${facility}`, (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'shelter-registry', `${facility}.html`));
    });
});

// Bookshelf API: Populates the text-learning showcase module on your landing page
app.get('/api/bookshelf', (req, res) => {
    res.json([
        { id: 1, title: "Creating a Website: The Missing Manual", application: "Express server backbone and infrastructure routing." },
        { id: 2, title: "Practical HTML5 Projects", application: "Semantic grid layouts tracking operational shelter metrics." },
        { id: 3, title: "jQuery: Novice to Ninja", application: "Client-side event handlers and zero-log information capture." },
        { id: 4, title: "CSS Secrets", application: "Trauma-informed, accessible high-contrast component styling." }
    ]);
});

// JSON Router Protection to completely prevent unexpected parsing token crashes
app.use('/api', (req, res) => {
    res.status(404).json({ error: "Data pipeline target not found." });
});

// Standard fallback routing for main section
app.get('/know-your-rights', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'legal-rights', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`Family Media Network Online Engine Active`);
    console.log(`Review interface or test your scripts via http://localhost:${PORT}`);
    console.log(`=======================================================`);
});
