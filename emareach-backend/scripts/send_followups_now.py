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

campaign_id = '3352db85-45c1-48fd-8c67-ee8b69fcfa43'

async def main():
    gs = GmailService(db)
    llm = LLMService(db)
    smtp = SMTPService(db)
    es = EmailService(db, gs, llm, smtp_service=smtp)
    
    campaign = await db.campaigns.find_one({'id': campaign_id})
    t2_id = campaign['email_sequence'][1]['template_id']
    t2 = await db.templates.find_one({'id': t2_id})
    sender_id = campaign['sender_ids'][0]
    
    contacts = await db.contacts.find({'user_id': campaign['user_id']}).to_list(20)
    print(f'Sending Step 2 Follow-up emails to {len(contacts)} contacts:')
    
    for contact in contacts:
        email = contact['email']
        first_name = contact.get('first_name', '')
        company = contact.get('company', '')
        industry = contact.get('industry', '')
        
        subject = t2['subject'].replace('{{company}}', company).replace('{{first_name}}', first_name)
        body = t2['body'].replace('{{first_name}}', first_name).replace('{{company}}', company).replace('{{industry}}', industry)
        body = body.replace('{Hi|Hello|Hey}', 'Hi')
        
        print(f'-> Sending Step 2 Follow-up to {email} ({first_name} @ {company})...')
        try:
            res = await es.send_email(
                user_id=campaign['user_id'],
                campaign_id=campaign_id,
                contact_id=contact['id'],
                template_id=t2_id,
                subject=subject,
                body=body,
                body_type='rich',
                sender_id=sender_id,
                sender_type='gmail',
                sender_name='Zain Malik',
                sequence_step=2
            )
            mid = res.get('message_id')
            print(f'   [SUCCESS] Delivered Follow-up to {email}! Message ID: {mid}')
        except Exception as e:
            print(f'   [ERROR] Failed to send follow-up to {email}: {e}')
        
        await asyncio.sleep(2)

    print('\nAll Step 2 follow-ups delivered successfully!')

if __name__ == '__main__':
    asyncio.run(main())
