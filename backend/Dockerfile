FROM python:3.9
COPY . /code
WORKDIR /code
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
CMD ["uvicorn", "backend.main:app","--host", "0.0.0.0", "--port", "8080", "--reload"]
#ENTRYPOINT ["tail", "-f", "/dev/null"]
