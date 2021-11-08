from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

import backend.worker as tasks
from backend.base import settings
from backend.models import Process

engine = create_engine(settings.SQL_CONNECTION_STRING)
session = sessionmaker(bing=engine, autocommit=False, autoflush=False)
app = FastAPI()


def get_db():
    try:
        db = session()
        yield db
    finally:
        db.close()


@app.get("/celery_request")
def root():
    return "hello world"


@app.post("/create_process")
def read_root(process: Process) -> str:
    print(process.processName)
    tasks.execute_simulation.delay(process.processName)
    return 'something'


if __name__ == '__main__':
    import dotenv
    import uvicorn
    dotenv.load_dotenv('.env.debug')
    uvicorn.run(app, host='0.0.0.0', port=8001)
