import asyncio
import os
import sys
import uuid
from datetime import datetime, timezone

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from database import db

user_id = 'c6a5c652-f150-4cfb-a26a-9554cbeb66a7'

t1_id = 'd21376ec-0ed0-48ed-8e9a-b125dca699a0'
t2_id = str(uuid.uuid4())

t1_doc = {
    'id': t1_id,
    'user_id': user_id,
    'name': 'Step 1 - Cold Outreach (Personalized)',
    'subject': 'Quick question regarding {{company}}\'s lead generation',
    'body': '<p>{Hi|Hello|Hey} {{first_name}},</p><p>I noticed {{company}} is active in the {{industry}} space and wanted to reach out directly.</p><p>Most growing teams struggle with cold email deliverability and booking consistent B2B meetings without landing in spam folders.</p><p>We help companies automate personalized outreach sequences to book 15–25 qualified sales meetings every month on autopilot.</p><p>Would you be open to a quick 5-minute chat this week to see how this could work for {{company}}?</p><p>Best regards,<br><strong>Zain Malik</strong><br>Founder</p>',
    'body_type': 'rich',
    'sequence_number': 1,
    'updated_at': datetime.now(timezone.utc)
}

t2_doc = {
    'id': t2_id,
    'user_id': user_id,
    'name': 'Step 2 - Gentle Follow-up',
    'subject': 'Re: Quick question regarding {{company}}\'s lead generation',
    'body': '<p>{Hi|Hello|Hey} {{first_name}},</p><p>Just following up on my previous email in case it got buried in your inbox.</p><p>I\'d love to share 2-3 quick ideas on how {{company}} can scale its outreach without deliverability risks.</p><p>Do you have 5 minutes available later this week for a brief sync?</p><p>Best regards,<br><strong>Zain Malik</strong></p>',
    'body_type': 'rich',
    'sequence_number': 2,
    'created_at': datetime.now(timezone.utc),
    'updated_at': datetime.now(timezone.utc)
}

async def main():
    await db.templates.update_one({'id': t1_id}, {'$set': t1_doc}, upsert=True)
    existing_t2 = await db.templates.find_one({'name': 'Step 2 - Gentle Follow-up', 'user_id': user_id})
    if existing_t2:
        await db.templates.update_one({'id': existing_t2['id']}, {'$set': t2_doc})
    else:
        await db.templates.insert_one(t2_doc)
    print('Templates configured successfully in database!')

if __name__ == '__main__':
    asyncio.run(main())
