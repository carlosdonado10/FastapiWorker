FROM python:3.9
WORKDIR code/workers
COPY ./requirements.txt /code/workers/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/workers/requirements.txt
COPY . /code/workers
CMD ["celery", "-A", "worker", "worker", "--loglevel=INFO"]
