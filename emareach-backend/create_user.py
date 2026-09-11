#!/usr/bin/env python3
"""Script to create a verified user account with Pro limits for local testing."""

import asyncio
from pathlib import Path
import sys

sys.path.append(str(Path(__file__).parent))

from database import db
from models import User
from routes.auth_utils import get_password_hash
from routes.settings import create_default_settings_for_user

async def create_user(email: str = "user@example.com", password: str = "user123"):
    existing = await db.users.find_one({"email": email})
    if existing:
        print(f"[NOTE] User {email} already exists!")
        return
    
    user = User(
        email=email,
        password_hash=get_password_hash(password),
        first_name="Test",
        last_name="User",
        company="My Company",
        status="active",
        plan_id="pro",
        subscription_status="active",
        email_verified=True,
        two_fa_enabled=False,
        credits_balance=10000,
        extra_max_domains=10,
        extra_max_subdomains=50,
        extra_max_google_accounts=20,
        extra_max_campaigns=100,
        extra_max_monthly_smtp_emails=50000,
    )
    
    result = await db.users.insert_one(user.model_dump())
    if result.inserted_id:
        await create_default_settings_for_user(user.id)
        print(f"[SUCCESS] User created successfully!")
        print(f"Email: {email}")
        print(f"Password: {password}")
    else:
        print("[ERROR] Failed to create user.")

if __name__ == "__main__":
    email = sys.argv[1] if len(sys.argv) > 1 else "user@example.com"
    password = sys.argv[2] if len(sys.argv) > 2 else "user123"
    asyncio.run(create_user(email, password))
