cat > /tmp/README.md << 'EOF'
# RentWise

![CI](https://github.com/Nimothy555/rentwise_apartment-reviews/actions/workflows/ci.yml/badge.svg)

A full-stack apartment review and renter-verification platform. Renters can browse listings, read and write verified reviews, and rate properties across multiple dimensions (noise, parking, responsiveness, value). Built as a full-stack capstone and containerized for reproducible deployment.

**Live site:** [rent-wise.live](https://rent-wise.live)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router, React-Leaflet (maps) |
| Backend | Node.js, Express, SQLite (sqlite3) |
| Auth | JWT, bcrypt, session-based verification |
| Integrations | Nodemailer (email workflows), Multer (PDF/document uploads), Anthropic API (review scoring) |
| Infrastructure | Docker (multi-stage build), Docker Compose |
| Testing | Playwright (end-to-end) |

## Features

- **Verified reviews** — renters verify tenancy via document upload before reviewing, reducing fake reviews.
- **Multi-dimensional ratings** — properties scored on noise, parking, responsiveness, and value, not just a single star rating.
- **Review helpfulness scoring** — a regression model surfaces high-quality reviews to the top.
- **Interactive map** — listings plotted geographically via Leaflet.
- **Automated email workflows** — verification and notification emails via Nodemailer.

## Running Locally with Docker

The entire application is containerized. With Docker installed:

```bash
# 1. Copy the environment template and fill in your values
cp server/.env.example server/.env
# (edit server/.env with your real keys)

# 2. Build and start the container
docker compose up --build

# 3. Open the app
# http://localhost:3000
```

The SQLite database is bind-mounted from `server/rentwise.db`, so data persists across container restarts.

## Running Locally without Docker

```bash
npm run install:all   # installs root, server, and client dependencies
npm run dev           # runs server + client concurrently
```

## Architecture Notes

The Docker image uses a **multi-stage build**:

1. **Stage 1 (`build-client`)** compiles the React frontend with Vite into static assets.
2. **Stage 2** installs production-only server dependencies and copies in the built frontend from Stage 1.

This keeps the final image small — build tooling (Vite, dev dependencies) never ships to the production image. Express serves both the API and the built React app from a single container on port 3000.

## Environment Variables

See `server/.env.example` for the full list. Key variables:

- `JWT_SECRET` — signing secret for auth tokens
- `GMAIL_USER` / `GMAIL_APP_PASSWORD` — for outbound verification emails
- `ANTHROPIC_API_KEY` — for review helpfulness scoring
- `FRONTEND_URL` — base URL for email links

## Project Structure

```
apartment-reviews/
├── client/           # React + Vite frontend
├── server/           # Express backend
│   ├── app.js        # server entry point
│   ├── db.js         # SQLite connection + schema loading
│   ├── routes/       # API route handlers
│   └── middleware/   # auth, uploads, etc.
├── database.sql      # canonical schema
├── Dockerfile        # multi-stage build
└── docker-compose.yml
```

## License

ISC
EOF
echo "README draft ready:"
echo "===================="
cat /tmp/README.md
Output

README draft ready:
====================
# RentWise

A full-stack apartment review and renter-verification platform. Renters can browse listings, read and write verified reviews, and rate properties across multiple dimensions (noise, parking, responsiveness, value). Built as a full-stack capstone and containerized for reproducible deployment.

**Live site:** [rent-wise.live](https://rent-wise.live)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router, React-Leaflet (maps) |
| Backend | Node.js, Express, SQLite (sqlite3) |
| Auth | JWT, bcrypt, session-based verification |
| Integrations | Nodemailer (email workflows), Multer (PDF/document uploads), Anthropic API (review scoring) |
| Infrastructure | Docker (multi-stage build), Docker Compose |
| Testing | Playwright (end-to-end) |

## Features

- **Verified reviews** — renters verify tenancy via document upload before reviewing, reducing fake reviews.
- **Multi-dimensional ratings** — properties scored on noise, parking, responsiveness, and value, not just a single star rating.
- **Review helpfulness scoring** — a regression model surfaces high-quality reviews to the top.
- **Interactive map** — listings plotted geographically via Leaflet.
- **Automated email workflows** — verification and notification emails via Nodemailer.

## Running Locally with Docker

The entire application is containerized. With Docker installed:

```bash
# 1. Copy the environment template and fill in your values
cp server/.env.example server/.env
# (edit server/.env with your real keys)

# 2. Build and start the container
docker compose up --build

# 3. Open the app
# http://localhost:3000
```

The SQLite database is bind-mounted from `server/rentwise.db`, so data persists across container restarts.

## Running Locally without Docker

```bash
npm run install:all   # installs root, server, and client dependencies
npm run dev           # runs server + client concurrently
```

## Architecture Notes

The Docker image uses a **multi-stage build**:

1. **Stage 1 (`build-client`)** compiles the React frontend with Vite into static assets.
2. **Stage 2** installs production-only server dependencies and copies in the built frontend from Stage 1.

This keeps the final image small — build tooling (Vite, dev dependencies) never ships to the production image. Express serves both the API and the built React app from a single container on port 3000.

## Environment Variables

See `server/.env.example` for the full list. Key variables:

- `JWT_SECRET` — signing secret for auth tokens
- `GMAIL_USER` / `GMAIL_APP_PASSWORD` — for outbound verification emails
- `ANTHROPIC_API_KEY` — for review helpfulness scoring
- `FRONTEND_URL` — base URL for email links

## Project Structure

```
apartment-reviews/
├── client/           # React + Vite frontend
├── server/           # Express backend
│   ├── app.js        # server entry point
│   ├── db.js         # SQLite connection + schema loading
│   ├── routes/       # API route handlers
│   └── middleware/   # auth, uploads, etc.
├── database.sql      # canonical schema
├── Dockerfile        # multi-stage build
└── docker-compose.yml
```

## License

ISC


## Kubernetes

Manifests in `k8s/` deploy the containerized app to a Kubernetes cluster:

​```bash
kubectl apply -f k8s/
kubectl port-forward service/rentwise 8080:3000
# open http://localhost:8080
​```
