from celery import Celery
from time import sleep


worker = Celery('workers', broker='amqp://guest@rabbitmq:5672/')


@worker.task(name='worker.execute_simulation')
def execute_simulation(something: str) -> str:
    sleep(30)
    print(something)
    return something
