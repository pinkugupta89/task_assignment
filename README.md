Task Assignment Backend (Node.js + TypeScript)

📌 Description

This service integrates data from an external Pollution API, enriches results with Wikipedia descriptions and Country names, and returns only valid city entries.It ensures clean, maintainable code with filtering, duplicate handling, and caching.

🚀 Tech Stack

Node.js (Express)

TypeScript

Axios (external API calls)

Node-cache (in-memory caching)

⚡ Features

Fetches pollution data from external API

Filters valid city names (removes invalid/corrupted data)

Avoids duplicates (case-insensitive, whitespace safe)

Enriches results with Wikipedia descriptions

Fetches country names from REST Countries API

Caches responses to handle API rate limits

🛠️ Scripts

npm run dev → Run in development with hot reload

npm run build → Compile TypeScript to /dist

npm start → Run compiled code in production

🔗 APIs Used

Pollution Data APIBase URL: https://be-recruitment-task.onrender.comDocs: API Docs

Wikipedia REST API → City descriptions

REST Countries APIhttps://restcountries.com/v3.1/alpha/{code} → Country name lookup

📝 Business Rules

A valid city:

Contains only letters/spaces (no digits or special chars)

Normalized (trimmed, lowercased) for duplicate checks

Non-city or corrupted entries are excluded

Duplicate city names are skipped

Caching prevents unnecessary API calls

⚙️ Setup

# Clone repo
git clone https://github.com/pinkugupta89/task_assignment.git
cd task_assignment

# Install deps
npm install

# Run in dev
npm run dev

# Build & run in prod
npm run build
npm start

⚠️ Limitations

Cache resets on server restart (no DB persistence)

Wikipedia & external APIs have rate limits

Only English Wikipedia descriptions are fetched

👨‍💻 Author

Pankaj Kumar GuptaTech Lead | Node.js | MongoDB | NestJS | PostgreSQL | Redis | Microservices | Docker | K8s | Git