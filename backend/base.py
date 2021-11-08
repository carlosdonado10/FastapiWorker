from pydantic import BaseSettings

class Settings(BaseSettings):
    RABBIT_MQ_BROKER_URL: str
    SQL_CONNECTION_STRING: str

settings = Settings()
