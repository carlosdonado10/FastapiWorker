from celery import Celery
from time import sleep

app = Celery('workers', broker='pyamqp://guest@rabbitmq//')

@app.task
def execute_simulation(something: str) -> str:
    sleep(30)
    print(something)
    return something
