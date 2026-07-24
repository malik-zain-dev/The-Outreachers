# Emareach

An open-source cold email outreach and deliverability platform: build contact
lists, run multi-step campaigns across your own inboxes, warm up mailboxes to
stay out of spam, and track opens, clicks, and replies — with billing, an admin
panel, and infrastructure-as-code included.

> **Monorepo.** A FastAPI backend, two Next.js apps, and Terraform/Caddy
> infrastructure, wired together with Docker Compose for one-command local runs.

## Contents

| Path                       | Stack             | Description                                        |
| -------------------------- | ----------------- | -------------------------------------------------- |
| `emareach-backend/`        | FastAPI (Python)  | REST API: auth, campaigns, warm-up, billing, DNS, tracking |
| `emareach-frontend-next/`  | Next.js 15 + TS   | Marketing site and the user-facing app             |
| `emareach-admin-panel/`    | Next.js + TS      | Internal admin panel                               |
| `infrastructure/`          | Terraform + Caddy | AWS deploy (EC2, ALB, ECR, IAM) + reverse proxy    |
| `docker-compose.yml`       | Docker            | Runs the whole stack locally (incl. MongoDB)       |

## Features

- **Campaigns** — sequences, scheduling, per-inbox sending limits, A/B templates
- **Deliverability & warm-up** — mailbox warm-up with LLM-generated threads,
  spam→inbox recovery, SPF/DKIM/DMARC checks
- **Inboxes** — connect Gmail/Outlook via OAuth or SMTP/IMAP app passwords
- **Contacts** — lists, enrichment, email validation, smart lead search
- **Tracking** — open pixels, click tracking, custom tracking domains
- **Billing** — Razorpay (India) and Lemon Squeezy (international) plans
- **Admin panel** — user, plan, warm-up, and infrastructure management
- **Support bot** — retrieval-augmented (ChromaDB) assistant over the docs/blog corpus

## Architecture

```
                        ┌──────────────────────┐
  Marketing + app  ───► │  emareach-frontend    │  Next.js 16 · React 19
  (localhost:8080)      │  (SSR + API proxies)  │
                        └───────────┬──────────┘
                                    │  /api/*
  Admin panel      ───► ┌───────────▼──────────┐        ┌───────────┐
  (localhost:8082)      │  emareach-backend     │◄──────►│  MongoDB  │
                        │  FastAPI · 46 routers │        └───────────┘
                        │  52 service modules   │
                        └───────────┬──────────┘
                    external integrations (all optional):
      Gmail/Outlook OAuth · SMTP/IMAP · SendGrid · Groq LLM · Serper ·
      Razorpay · Lemon Squeezy · Slack · Cloudinary/ImageKit · AWS (SSM/ASG)
```

- **Backend** is a single FastAPI app (`server.py`) that mounts ~46 routers under
  `/api` and delegates business logic to ~52 service modules. Async MongoDB access
  via Motor. Background jobs (campaign batches, warm-up, cleanup) run in-process.
- **Two Next.js apps** share the same backend. The frontend serves the marketing
  site and the authenticated user app; the admin panel is an internal console.
  Both proxy API calls server-side so the browser never needs the backend host.
- **Secrets at rest** (inbox passwords, OAuth refresh tokens) are encrypted with a
  Fernet `ENCRYPTION_KEY` before storage. Auth uses JWTs signed with `JWT_SECRET`.

## Tech stack

| Layer     | Technologies                                                            |
| --------- | ----------------------------------------------------------------------- |
| Backend   | Python 3.12, FastAPI 0.135, Motor/PyMongo, Pydantic 2, cryptography, python-jose |
| Frontend  | Next.js 16, React 19, TypeScript, Tailwind CSS                          |
| Data      | MongoDB 7, ChromaDB (support-bot vector store)                          |
| AI        | Groq LLM (warm-up threads, support bot), Serper (lead search)           |
| Email     | Gmail/Outlook OAuth, SMTP/IMAP, SendGrid (transactional + inbound parse)|
| Billing   | Razorpay, Lemon Squeezy                                                 |
| Infra     | Docker Compose, Terraform (AWS EC2/ALB/ECR/IAM/SSM), Caddy              |

## Quick start (Docker)

Requires Docker with the Compose plugin.

```bash
# 1. Root compose knobs (ports, Mongo URL, public URLs)
cp .env.example .env

# 2. Per-service secrets — fill these in with your own credentials
cp emareach-backend/.env.example        emareach-backend/.env
cp emareach-frontend-next/.env.example  emareach-frontend-next/.env.local
cp emareach-admin-panel/.env.example    emareach-admin-panel/.env.local

# 3. Build and run everything (backend, frontend, admin, MongoDB)
docker compose up --build
```

| Service   | URL                     |
| --------- | ----------------------- |
| Frontend  | http://localhost:8080   |
| Admin     | http://localhost:8082   |
| API       | http://localhost:8001/api |
| API health| http://localhost:8001/api/health |

The backend needs at minimum `MONGO_URL`, `DB_NAME`, `JWT_SECRET`, and
`ENCRYPTION_KEY`. Generate an encryption key with:

```bash
python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

Everything else in `emareach-backend/.env.example` is optional and only needed
for the corresponding integration (Google/Microsoft OAuth, SendGrid/SES/Mailgun,
Groq, Slack, billing, etc.).

## Local development (without Docker)

**Backend** (Python 3.12+, MongoDB running locally):

```bash
cd emareach-backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env    # fill in values
uvicorn server:app --reload --port 8001
pytest                  # run tests
```

**Frontend / Admin** (Node 20+):

```bash
cd emareach-frontend-next    # or emareach-admin-panel
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

## Deployment

Production infrastructure is defined with Terraform in `infrastructure/terraform`
(EC2 behind an ALB, image in ECR, secrets in AWS SSM Parameter Store) and a Caddy
reverse proxy in `infrastructure/caddy`. See
[`infrastructure/terraform/README.md`](./infrastructure/terraform/README.md).

Secrets are delivered to the server from SSM, not baked into images. Push your
local `.env` to SSM with:

```bash
cd infrastructure
ENV_FILE=../emareach-backend/.env ./update-ssm-env.sh
```

## Configuration

Each app ships a `.env.example` documenting every variable. Copy it to the real
env file and fill in your own credentials — the example files contain only
placeholders. No real secrets live in this repository.

## Contributing & security

- [CONTRIBUTING.md](./CONTRIBUTING.md) — dev setup and ground rules
- [SECURITY.md](./SECURITY.md) — reporting vulnerabilities and secret handling

## License

[MIT](./LICENSE)
