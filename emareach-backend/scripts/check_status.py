import asyncio
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.stdout.reconfigure(encoding='utf-8')
from database import db, admin_db

async def main():
    campaigns = await db.campaigns.find({}, {'_id':0, 'id':1, 'name':1, 'status':1, 'daily_limit':1, 'sender_ids':1}).to_list(10)
    for c in campaigns:
        print('CAMPAIGN:', c.get('name'), 'STATUS:', c.get('status'), 'ID:', c.get('id'))
    
    logs = await db.email_logs.find({}, {'_id':0, 'campaign_id':1, 'to_email':1, 'status':1, 'sent_at':1}).to_list(20)
    print('\nTOTAL LOGS:', len(logs))
    for l in logs:
        print('SENT TO:', l.get('to_email'), 'AT:', l.get('sent_at'), 'STATUS:', l.get('status'))
        
    jobs = await admin_db.system_jobs.find({}, {'_id':0, 'job_type':1, 'status':1, 'scheduled_at':1, 'action_config':1}).to_list(20)
    print('\nSYSTEM JOBS:')
    for j in jobs:
        print('JOB:', j.get('status'), 'SCHEDULED_AT:', j.get('scheduled_at'), 'CONFIG:', j.get('action_config'))

    inbox = await db.inboxes.find_one({})
    print('\nINBOX:', inbox.get('email'), 'daily_limit:', inbox.get('daily_limit'), 'rampup:', inbox.get('campaign_rampup'), 'started:', inbox.get('campaign_rampup_started_at'))

if __name__ == '__main__':
    asyncio.run(main())
