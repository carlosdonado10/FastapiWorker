FROM python:3.9
WORKDIR code
COPY . /code
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
CMD ["celery", "-A", "backend.worker", "worker", "-E", "--loglevel=INFO"]
#ENTRYPOINT ["tail", "-f", "/dev/null"]
