import asyncio
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.stdout.reconfigure(encoding='utf-8')
from database import db
from services.email_service import EmailService
from services.gmail_service import GmailService
from services.llm_service import LLMService
from services.smtp_service import SMTPService
from services.imap_reply_service import ImapReplyService

user_id = 'c6a5c652-f150-4cfb-a26a-9554cbeb66a7'

async def main():
    gs = GmailService(db)
    llm = LLMService(db)
    smtp = SMTPService(db)
    imap = ImapReplyService(db, smtp)
    es = EmailService(db, gs, llm, smtp_service=smtp, imap_reply_service=imap)
    
    print('Checking IMAP for incoming replies from connected inbox...')
    res = await es.check_replies(user_id)
    print('Sync result:', res)
    
    # Check all replied logs
    replied_logs = await db.email_logs.find({'status': 'replied'}).to_list(10)
    print(f'Total replied logs: {len(replied_logs)}')
    for r in replied_logs:
        print(f"  To: {r.get('to_email')}, Subject: {r.get('subject')}, Body: {r.get('reply_body')}")

if __name__ == '__main__':
    asyncio.run(main())
