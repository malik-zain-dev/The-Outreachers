# Security Policy

## Reporting a vulnerability

If you discover a security vulnerability, please **do not open a public issue**.
Instead, email the maintainers with details and reproduction steps. We aim to
acknowledge reports within 72 hours.

## Secrets

- Never commit real secrets. All credentials belong in `.env` files, which are
  git-ignored. Each service ships a `.env.example` documenting the required keys.
- Production secrets are delivered to the running server via AWS SSM Parameter
  Store (see `infrastructure/update-ssm-env.sh`), not baked into images or code.
- If you believe a secret was ever committed, rotate it immediately and purge it
  from history.

## Rotating credentials

Treat any credential that has been shared, logged, or committed as compromised.
Rotate it at the provider, update the relevant `.env` / SSM parameter, and
redeploy.
