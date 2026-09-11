import asyncio
import os
import sys
import uuid
from datetime import datetime, timezone

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from database import db

user_id = 'c6a5c652-f150-4cfb-a26a-9554cbeb66a7'
inbox_id = '9eb46b5a-24fb-4ae9-8b4e-647528528e50'
contact_list_id = '4f72a341-8b68-49f3-b1d4-83246c7133b3'
t1_id = 'd21376ec-0ed0-48ed-8e9a-b125dca699a0'
t2_id = 'c45a36e1-3a5c-49b8-8a9b-8551e2d28160'

campaign_id = str(uuid.uuid4())
now = datetime.now(timezone.utc)

campaign_doc = {
    'id': campaign_id,
    'user_id': user_id,
    'name': 'Live Test Sequence (Step 1 + Follow-up)',
    'daily_limit': 100,
    'sender_name': 'Zain Malik',
    'template_ids': [t1_id, t2_id],
    'contact_list_ids': [contact_list_id],
    'contact_ids': [],
    'status': 'draft',
    'use_ai_generation': False,
    'sender_type': 'gmail',
    'sender_ids': [inbox_id],
    'sender_rotation': 'round_robin',
    'rotation_enabled': False,
    'reply_to_type': 'gmail',
    'reply_to_id': inbox_id,
    'open_tracking': True,
    'start_time': '09:00',
    'end_time': '23:59',
    'timezone': 'Asia/Karachi',
    'schedule_weekdays': [0, 1, 2, 3, 4, 5, 6],
    'email_sequence': [
        {'template_id': t1_id, 'delay_days': 0},
        {'template_id': t2_id, 'delay_days': 0}
    ],
    'archived': False,
    'created_at': now,
    'updated_at': now
}

async def main():
    await db.campaigns.insert_one(campaign_doc)
    print('Campaign created with ID:', campaign_id)
    
    cl = await db.contact_lists.find_one({'id': contact_list_id})
    cids = cl.get('contact_ids', []) if cl else []
    
    for cid in cids:
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
    print('Initialized', len(cids), 'contacts in campaign queue as pending.')

if __name__ == '__main__':
    asyncio.run(main())
