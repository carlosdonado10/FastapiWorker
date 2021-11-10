from typing import List

from celery import group
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

import backend.worker as tasks
from backend.base import settings
from backend.models import Process, SubProcess, Base

engine = create_engine(settings.SQL_CONNECTION_STRING)
Base.metadata.create_all(engine)
session = sessionmaker(bind=engine, autocommit=False, autoflush=False)
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


def get_db():
    try:
        db = session()
        yield db
    finally:
        db.close()


@app.get("/process/list")
def get_all(db: Session = Depends(get_db)):
    return Process.get_all(db)


@app.get('/process/subprocess/{process_id}')
def get_by_process_id(process_id: int, db: Session = Depends(get_db)) -> List[SubProcess]:
    return SubProcess.get_by_process_id(db, process_id)


@app.post("/create_process")
def read_root(process: Process, db: Session = Depends(get_db)) -> dict:
    process = process.ProcessTable(
        process_name=process.process_name,
        number_of_processes=process.number_of_processes,
        avg_time_delay=process.avg_time_delay)

    db.add(process)
    db.commit()

    print(process.process_name)
    groupped_tasks = (group(
        tasks.execute_single_core.s(process.avg_time_delay) for _ in range(process.number_of_processes)
          )  # | tasks.summarize_chains.s()
        ).apply_async(max_retries=30, interval=10)

    for child in groupped_tasks.children:
        sub_process = SubProcess.SubProcessTable(process_id=process.id, sub_process_id=child.id)
        db.add(sub_process)

    db.commit()

    return {
        'process_name': process.process_name,
        'sub_process_id': [child.id for child in groupped_tasks.children]
    }


@app.get('/status/{process_id}')
def get_status(process_id: int, db: Session = Depends(get_db)):
    sub_process_list = SubProcess.get_by_process_id(db, process_id)
    task_progress = {}
    for sp in sub_process_list:
        task_info = tasks.execute_simulation.AsyncResult(sp.sub_process_id).info
        if task_info is not None and 'PROGRESS' in task_info:
            task_progress[sp.sub_process_id] = task_info.get('PROGRESS')
        elif isinstance(task_info, str):
            task_progress[sp.sub_process_id] = 1
        else:
            task_progress[sp.sub_process_id] = 0

    return task_progress



if __name__ == '__main__':
    import dotenv
    import uvicorn
    dotenv.load_dotenv('.env.debug')
    uvicorn.run(app, host='0.0.0.0', port=8001)
