import asyncio
import os
import sys
import uuid
from datetime import datetime, timezone

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from database import db, admin_db

contacts_to_add = [
    {'email': 'zzzain115987@gmail.com', 'first_name': 'Zain', 'last_name': 'Malik', 'company': 'CyberShield', 'industry': 'Cybersecurity', 'custom_fields': {'location': 'Islamabad'}},
    {'email': 'zainmalic786@gmail.com', 'first_name': 'Zain', 'last_name': 'Ali', 'company': 'Tech Innovations', 'industry': 'Software', 'custom_fields': {'location': 'Lahore'}},
    {'email': 'zainmalik.dev26@gmail.com', 'first_name': 'Zain', 'last_name': 'Dev', 'company': 'Outreachers', 'industry': 'IT Services', 'custom_fields': {'location': 'Karachi'}},
    {'email': 'followzain12@gmail.com', 'first_name': 'Zain', 'last_name': 'Follow', 'company': 'Digital Ventures', 'industry': 'Marketing', 'custom_fields': {'location': 'Rawalpindi'}},
    {'email': 'cybershield.org.pk@gmail.com', 'first_name': 'Cyber', 'last_name': 'Shield', 'company': 'CyberShield PK', 'industry': 'Security', 'custom_fields': {'location': 'Islamabad'}}
]

user_id = 'c6a5c652-f150-4cfb-a26a-9554cbeb66a7'
contact_list_id = '4f72a341-8b68-49f3-b1d4-83246c7133b3'
campaign_id = 'c09c6762-1c01-4255-8cf1-7768ca950d11'

async def main():
    now = datetime.now(timezone.utc)
    added_ids = []
    
    for item in contacts_to_add:
        existing = await db.contacts.find_one({'user_id': user_id, 'email': item['email']})
        if existing:
            cid = existing['id']
            print('Found existing contact:', item['email'])
        else:
            cid = str(uuid.uuid4())
            doc = {
                'id': cid,
                'user_id': user_id,
                'email': item['email'],
                'first_name': item['first_name'],
                'last_name': item['last_name'],
                'company': item['company'],
                'industry': item['industry'],
                'custom_fields': item['custom_fields'],
                'status': 'pending',
                'created_at': now
            }
            await db.contacts.insert_one(doc)
            print('Inserted contact:', item['email'])
        
        added_ids.append(cid)
        
        await db.campaign_contacts.update_one(
            {'campaign_id': campaign_id, 'contact_id': cid},
            {
                '$setOnInsert': {
                    'id': str(uuid.uuid4()),
                    'user_id': user_id,
                    'status': 'pending',
                    'events': [],
                    'created_at': now,
                },
                '$set': {'updated_at': now}
            },
            upsert=True
        )
    
    await db.contact_lists.update_one(
        {'id': contact_list_id},
        {'$addToSet': {'contact_ids': {'$each': added_ids}}, '$set': {'updated_at': now}}
    )
    print(f'Updated contact list with {len(added_ids)} contacts.')

    # Schedule immediate job
    await admin_db.system_jobs.delete_many({
        'job_type': 'send_campaign_batch',
        'action_config.campaign_id': campaign_id,
        'status': 'pending'
    })
    job_doc = {
        'id': str(uuid.uuid4()),
        'job_type': 'send_campaign_batch',
        'action_config': {'campaign_id': campaign_id},
        'status': 'pending',
        'scheduled_at': now,
        'created_at': now,
        'updated_at': now,
        'attempts': 0
    }
    await admin_db.system_jobs.insert_one(job_doc)
    print('Created fresh immediate batch job!')

if __name__ == '__main__':
    asyncio.run(main())
