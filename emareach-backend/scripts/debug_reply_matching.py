import asyncio
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.stdout.reconfigure(encoding='utf-8')
from database import db
from services.smtp_service import SMTPService
from services.imap_reply_service import _fetch_recent_headers_sync, GMAIL_IMAP_HOST, GMAIL_IMAP_PORT, _normalize_msg_id

async def main():
    smtp = SMTPService(db)
    inbox = await db.inboxes.find_one({'sender_type': 'gmail', 'gmail_auth_method': 'app_password'})
    if not inbox:
        print('No inbox found')
        return
        
    password = smtp._decrypt_password(inbox['gmail_app_password_encrypted'])
    username = inbox['email']
    print('Connecting to Gmail IMAP for:', username)
    
    messages = await asyncio.to_thread(
        _fetch_recent_headers_sync,
        GMAIL_IMAP_HOST,
        GMAIL_IMAP_PORT,
        username,
        password,
        max_messages=20
    )
    print(f'Fetched {len(messages)} recent incoming messages from Gmail inbox:')
    for i, m in enumerate(messages):
        print(f"\nMessage {i+1}:")
        print(f"  From: {m.get('from')}")
        print(f"  Subject: {m.get('subject')}")
        print(f"  Reply-To IDs: {m.get('reply_to_ids')}")
        print(f"  Body snippet: {m.get('body', '')[:120]}")
        
    logs = await db.email_logs.find({'status': 'sent'}).to_list(20)
    print(f"\nExisting sent logs in DB ({len(logs)}):")
    for l in logs:
        print(f"  ID: {l.get('id')}, smtp_message_id: {l.get('smtp_message_id')}, to: {l.get('to_email')}")

if __name__ == '__main__':
    asyncio.run(main())
