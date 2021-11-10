from celery import Celery, chain
from time import time
import random
from .base import settings

# db_backend = DatabaseBackend(dburi=settings.SQL_CONNECTION_STRING)
CELERY_DB_PREFIX = 'db+'
worker = Celery('workers', broker=settings.RABBIT_MQ_BROKER_URL)
worker.backend_cls = f'{CELERY_DB_PREFIX}{settings.SQL_CONNECTION_STRING}'


@worker.task(name='worker.execute_simulation')
def execute_simulation(progress) -> str:
    print(progress)
    job = chain((execute_single_core for _ in range(progress['number_of_processes'])))
    return


@worker.task(name='worker.execute_single_core', bind=True)
def execute_single_core(self, avg_time):
    wait = random.lognormvariate(avg_time, 1)
    self.update_state(state='WAIT', meta={'WAIT': wait})
    t = time()
    while time() < t + wait:
        print(f'update state progress: {(time() - t) / wait}')
        self.update_state(state='PROGRESS', meta={'PROGRESS': (time() - t) / wait})

    self.update_state(state='PROGRESS', meta={'PROGRESS': 1})
    return f'single core waited for {wait}'


@worker.task(name='worker.summary')
def summarize_chains(progress):
    print('summarize chains')
    return
