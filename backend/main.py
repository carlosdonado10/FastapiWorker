from fastapi import FastAPI
from workers import worker

app = FastAPI()


@app.get("/something")
def read_root(something: str) -> str:
    worker.execute_simulation.delay(something)
    return 'something'
