from celery import Celery
from time import sleep
# from backend.base import settings

app = Celery('workers', broker_url='amqp://guest@rabbitmq:5672/rabbitmq')

@app.task
def execute_simulation(something: str) -> str:
    sleep(30)
    print(something)
    return something

if __name__ == '__main__':
    app.start()
