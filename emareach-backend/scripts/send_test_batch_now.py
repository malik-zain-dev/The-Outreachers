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
    t1_id = campaign['email_sequence'][0]['template_id']
    t1 = await db.templates.find_one({'id': t1_id})
    sender_id = campaign['sender_ids'][0]
    
    pending_ccs = await db.campaign_contacts.find({'campaign_id': campaign_id, 'status': {'$in': ['pending', 'failed']}}).to_list(20)
    print(f'Sending test emails to {len(pending_ccs)} contacts:')
    
    for cc in pending_ccs:
        contact = await db.contacts.find_one({'id': cc['contact_id']})
        if not contact:
            continue
        
        email = contact['email']
        first_name = contact.get('first_name', '')
        company = contact.get('company', '')
        industry = contact.get('industry', '')
        
        subject = t1['subject'].replace('{{company}}', company).replace('{{first_name}}', first_name)
        body = t1['body'].replace('{{first_name}}', first_name).replace('{{company}}', company).replace('{{industry}}', industry)
        body = body.replace('{Hi|Hello|Hey}', 'Hi')
        
        print(f'-> Sending to {email} ({first_name} @ {company})...')
        try:
            res = await es.send_email(
                user_id=campaign['user_id'],
                campaign_id=campaign_id,
                contact_id=contact['id'],
                template_id=t1_id,
                subject=subject,
                body=body,
                body_type='rich',
                sender_id=sender_id,
                sender_type='gmail',
                sender_name='Zain Malik',
                sequence_step=1
            )
            mid = res.get('message_id')
            print(f'   [SUCCESS] Delivered to {email}! Message ID: {mid}')
            await db.campaign_contacts.update_one(
                {'campaign_id': campaign_id, 'contact_id': contact['id']},
                {'$set': {'status': 'sent'}}
            )
        except Exception as e:
            print(f'   [ERROR] Failed to send to {email}: {e}')
        
        await asyncio.sleep(2)

    print('\nAll test contacts processed successfully!')

if __name__ == '__main__':
    asyncio.run(main())
