# Contributing

Thanks for your interest in improving Emareach! This is a monorepo with three
apps and infrastructure code.

## Repository layout

| Path                     | Stack            | Description                                   |
| ------------------------ | ---------------- | --------------------------------------------- |
| `emareach-backend/`      | FastAPI (Python) | REST API, campaigns, warm-up, billing, auth   |
| `emareach-frontend-next/`| Next.js          | Marketing site + user-facing app              |
| `emareach-admin-panel/`  | Next.js          | Internal admin panel                          |
| `infrastructure/`        | Terraform + shell| AWS (EC2, ALB, ECR, IAM) + Caddy reverse proxy|

## Getting started

See the [README](./README.md) for full setup. The fastest path is Docker:

```bash
cp .env.example .env
docker compose up --build
```

## Ground rules

- **Never commit secrets.** Put them in `.env` files (git-ignored). If you add a
  new config value, document it in the matching `.env.example`.
- Keep changes scoped to one app/concern per pull request where possible.
- Match the style and conventions of the surrounding code.

## Development

**Backend**

```bash
cd emareach-backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill in values
uvicorn server:app --reload --port 8001
pytest                 # run the test suite
```

**Frontend / Admin**

```bash
cd emareach-frontend-next   # or emareach-admin-panel
npm install
cp .env.example .env.local  # fill in values
npm run dev
```

## Reporting security issues

Please follow [SECURITY.md](./SECURITY.md) — do not open public issues for
vulnerabilities.
