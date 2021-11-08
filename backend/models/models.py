from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from pydantic import BaseModel, validator
import re

Base = declarative_base()


class Process(BaseModel):
    process_name: str
    number_of_processes: int
    avg_time_delay: int

    class Config:
        orm_mode = True

    class ProcessTable(Base):
        __tablename__ = 'process_table'
        id = Column(Integer, primary_key=True)
        process_name = Column(String(64))
        number_of_processes = Column(Integer)
        avg_time_delay = Column(Integer)
