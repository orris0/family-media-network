# Family Media Network - Production Setup Guide

## 🚀 Quick Start

### Installation

```bash
cd family-media-network
npm install
```

### Running Locally

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will be available at: `http://localhost:3000`

---

## 📁 Project Structure

```
family-media-network/
├── server.js                 # Express server & API routes
├── db.js                     # SQLite database setup
├── package.json              # Dependencies
├── bin/
│   └── www                   # Server launcher
├── public/
│   ├── index.html            # Press-release landing page
│   ├── portal.html           # Incident reporting portal
│   ├── dashboard.html        # Analytics dashboard
│   ├── know-your-rights/
│   │   └── index.html        # Legal rights guide
│   ├── email-template.html   # City official email
│   └── registries/           # Shelter-specific pages
└── .env                      # Environment variables
```

---

## 🔌 API Endpoints

### Incident Reporting

**POST** `/api/incidents`
- Submit confidential incident report
- Required: `incidentType`, `facility`, `incidentDate`, `narrative`
- Returns: incident object + next steps

**GET** `/api/incidents`
- Retrieve incident reports (with filters)
- Query params: `borough`, `type`, `facility`, `limit`

**GET** `/api/incidents/:id`
- Get single incident details

### Analytics

**GET** `/api/analytics`
- Full dashboard data (trends, severity, facilities)

**GET** `/api/analytics/boroughs`
- Borough-by-borough breakdown

**GET** `/api/analytics/types`
- Incident type distribution

**GET** `/api/analytics/facilities`
- Facility hotspot data

**GET** `/api/analytics/severity`
- Severity level breakdown

### Resources

**GET** `/api/resources/rights`
- Know Your Rights guide data

**GET** `/api/resources/legal-aid`
- Legal aid organizations directory

### Authentication (Mock)

**POST** `/api/auth/login`
- Email + password authentication
- Returns: user object + token

### Health

**GET** `/api/health`
- Server status check

---

## 🔐 Environment Variables

Create a `.env` file:

```env
PORT=3000
NODE_ENV=development
# Add more as needed for production:
# DATABASE_URL=...
# CORS_ORIGIN=https://yourdomain.com
# SMTP_HOST=... (for email notifications)
```

---

## 📊 Dashboard Features

The dashboard (`/dashboard`) includes:

- **Monthly Trends Chart** - Line graph of incidents by borough
- **Borough Comparison** - Bar chart ranking hotspots
- **Incident Type Distribution** - Breakdown of violation types
- **Severity Heatmap** - High/Medium/Low breakdown
- **Facility Rankings** - Top reported sites
- **Current Hotspots** - Real-time trending locations
- **Filter Controls** - Year, borough, incident type

Data is pulled from `/api/analytics` endpoints.

---

## 🔒 Security

The server implements:

- **Helmet.js** - Security headers (CSP, XSS protection)
- **CORS** - Cross-origin request filtering
- **Input Validation** - JSON payload checking
- **SQL Injection Prevention** - Prepared statements (when using DB)

For production:
- Add rate limiting: `npm install express-rate-limit`
- Enable HTTPS
- Restrict CORS to allowed domains
- Use environment-based secrets
- Add authentication middleware

---

## 📱 Responsive Design

All pages are optimized for:
- 📱 Mobile (< 600px)
- 💻 Tablet (600px - 1000px)
- 🖥️ Desktop (> 1000px)

---

## 🚢 Deployment

### Heroku

```bash
heroku login
heroku create family-media-network
git push heroku master
heroku open
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Railway / Render / DigitalOcean

1. Connect repo to platform
2. Set environment variables
3. Deploy (auto-deploys on push)

---

## 📞 Support & Resources

- **Legal Aid Society:** 800-649-2424
- **DHS Ombudsman:** 800-994-6494
- **Emergency Shelter:** 311
- **GitHub Issues:** Report bugs here

---

## 📝 API Testing

### Example: Submit Incident

```bash
curl -X POST http://localhost:3000/api/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "incidentType": "violence",
    "facility": "the-kelly",
    "incidentDate": "2026-10-07",
    "narrative": "Staff member used excessive force during room inspection.",
    "email": "survivor@example.com"
  }'
```

### Example: Get Analytics

```bash
curl http://localhost:3000/api/analytics
curl http://localhost:3000/api/analytics/boroughs
curl http://localhost:3000/api/health
```

---

## 📈 Future Enhancements

- [ ] Real database (PostgreSQL/MongoDB)
- [ ] User authentication with JWT
- [ ] Email notifications on report submission
- [ ] Admin dashboard for moderation
- [ ] Map visualization of incidents
- [ ] PDF report generation
- [ ] SMS alerts for hotspots
- [ ] Community forum / discussion

---

## License

ISC © 2026 Family Media Network Collective
